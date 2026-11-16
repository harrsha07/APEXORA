'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  Product,
  Collection,
  WebsiteSettings,
  HomepageSection,
  NavigationItem,
  ContentPage,
  Order,
  Customer,
  DiscountCode,
  MediaItem,
  CartItem,
  AuditLog
} from '@/types';
import {
  initialProducts,
  initialCollections,
  initialSettings,
  initialHomepageSections,
  initialNavigation,
  initialPages,
  initialOrders,
  initialCustomers,
  initialDiscounts,
  initialMedia
} from './initialData';
import { getSupabase } from './supabase';

type StoreState = {
  products: Product[];
  collections: Collection[];
  settings: WebsiteSettings;
  homepageSections: HomepageSection[];
  navigation: NavigationItem[];
  pages: ContentPage[];
  orders: Order[];
  customers: Customer[];
  discounts: DiscountCode[];
  media: MediaItem[];
  auditLogs: AuditLog[];
};

type StoreContextType = {
  // Published / Active data (or Draft data when in preview mode)
  products: Product[];
  collections: Collection[];
  settings: WebsiteSettings;
  homepageSections: HomepageSection[];
  navigation: NavigationItem[];
  pages: ContentPage[];
  orders: Order[];
  customers: Customer[];
  discounts: DiscountCode[];
  media: MediaItem[];
  auditLogs: AuditLog[];

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  appliedDiscount: DiscountCode | null;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  updateCartQuantity: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Referral Discount System
  hasReferred: boolean;
  unlockReferralDiscount: () => DiscountCode;

  // Modals & UI states
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Draft & Publish engine
  isDraftMode: boolean;
  setIsDraftMode: (enabled: boolean) => void;
  hasUnpublishedChanges: boolean;
  draftState: StoreState;
  updateDraft: <K extends keyof StoreState>(key: K, updater: (prev: StoreState[K]) => StoreState[K]) => void;
  publishChanges: () => Promise<void>;
  discardDraft: () => void;
  restoreDefaults: () => void;

  // Direct mutations (for orders placed by customers or instant admin updates)
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status'], tracking?: { trackingNumber?: string; carrier?: string }) => void;

  // Products CRUD
  saveProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  duplicateProduct: (productId: string) => void;

  // Collections CRUD
  saveCollection: (col: Collection) => void;
  deleteCollection: (colId: string) => void;

  // Pages CRUD
  savePage: (page: ContentPage) => void;
  deletePage: (pageId: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;

  // Homepage sections
  updateHomepageSection: (section: HomepageSection) => void;
  reorderHomepageSections: (sections: HomepageSection[]) => void;

  // Navigation
  saveNavItem: (item: NavigationItem) => void;
  deleteNavItem: (id: string) => void;

  // Discounts
  saveDiscount: (discount: DiscountCode) => void;
  deleteDiscount: (id: string) => void;

  // Media
  addMediaItem: (media: MediaItem) => void;
  deleteMediaItem: (id: string) => void;
};

const initialStoreState: StoreState = {
  products: initialProducts,
  collections: initialCollections,
  settings: initialSettings,
  homepageSections: initialHomepageSections,
  navigation: initialNavigation,
  pages: initialPages,
  orders: initialOrders,
  customers: initialCustomers,
  discounts: initialDiscounts,
  media: initialMedia,
  auditLogs: [
    {
      id: 'log-1',
      timestamp: '2026-02-14T10:00:00Z',
      action: 'System Initialized',
      user: 'Harsha (Owner)',
      details: 'Drop 001 catalogue and website configuration loaded'
    }
  ]
};

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEY_PUBLISHED = 'apexora_store_published_v2';
const STORAGE_KEY_DRAFT = 'apexora_store_draft_v2';
const STORAGE_KEY_CART = 'apexora_cart_v2';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [publishedState, setPublishedState] = useState<StoreState>(initialStoreState);
  const [draftState, setDraftState] = useState<StoreState>(initialStoreState);
  const [isDraftMode, setIsDraftMode] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [hasReferred, setHasReferred] = useState<boolean>(false);

  // UI states
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  }, []);

  // Load from local storage or Supabase on mount
  useEffect(() => {
    try {
      const mergeWithDefaults = (parsed: any): StoreState => {
        const mergedProducts = [...(parsed.products || [])];
        initialProducts.forEach(ip => {
          if (!mergedProducts.some(p => p.id === ip.id)) {
            mergedProducts.push(ip);
          }
        });

        const mergedCollections = [...(parsed.collections || [])];
        initialCollections.forEach(ic => {
          if (!mergedCollections.some(c => c.id === ic.id)) {
            mergedCollections.push(ic);
          }
        });

        const mergedNav = [...(parsed.navigation || [])];
        initialNavigation.forEach(inav => {
          if (!mergedNav.some(n => n.id === inav.id)) {
            mergedNav.push(inav);
          }
        });

        const mergedMedia = [...(parsed.media || [])];
        initialMedia.forEach(im => {
          if (!mergedMedia.some(m => m.id === im.id)) {
            mergedMedia.push(im);
          }
        });

        const mergedDiscounts = [...(parsed.discounts || [])];
        initialDiscounts.forEach(idisc => {
          if (!mergedDiscounts.some(d => d.code === idisc.code)) {
            mergedDiscounts.push(idisc);
          }
        });

        return {
          ...initialStoreState,
          ...parsed,
          products: mergedProducts,
          collections: mergedCollections,
          navigation: mergedNav,
          media: mergedMedia,
          discounts: mergedDiscounts
        };
      };

      const savedPublished = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      if (savedPublished) {
        const parsed = JSON.parse(savedPublished);
        setPublishedState(mergeWithDefaults(parsed));
      }
      const savedDraft = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setDraftState(mergeWithDefaults(parsed));
      } else if (savedPublished) {
        const parsed = JSON.parse(savedPublished);
        setDraftState(mergeWithDefaults(parsed));
      }
      const savedCart = localStorage.getItem(STORAGE_KEY_CART);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      // Check referral state and stored discount
      const savedReferred = localStorage.getItem('apexora_referred_v2');
      if (savedReferred === 'true') {
        setHasReferred(true);
      }
      const savedAppliedDiscount = localStorage.getItem('apexora_applied_discount_v2');
      if (savedAppliedDiscount) {
        try {
          setAppliedDiscount(JSON.parse(savedAppliedDiscount));
        } catch (e) {}
      }

      // Detect referral query param ?ref=... or ?referral=...
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('ref') || urlParams.get('referral')) {
          setHasReferred(true);
          const referralDiscount: DiscountCode = {
            id: 'disc-referral',
            code: 'RIDER20',
            type: 'percentage',
            value: 20,
            minOrderValue: 0,
            usageLimit: 10000,
            usageCount: 1,
            active: true,
            description: '20% Instant Referral Discount — Referral Active'
          };
          setAppliedDiscount(referralDiscount);
          try {
            localStorage.setItem('apexora_referred_v2', 'true');
            localStorage.setItem('apexora_applied_discount_v2', JSON.stringify(referralDiscount));
          } catch (e) {}
        }
      }
    } catch (e) {
      console.warn('Error loading local state:', e);
    }

    // Attempt to sync from Supabase if configured
    const supabase = getSupabase();
    if (supabase) {
      (async () => {
        try {
          const { data: dbProducts } = await (supabase as any).from('products').select('*').order('created_at', { ascending: true });
          if (dbProducts && dbProducts.length > 0) {
            const mapped: Product[] = dbProducts.map((p: any) => ({
              id: p.id,
              name: p.name,
              subtitle: p.subtitle || '',
              price: Number(p.price),
              compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
              image: p.image_url || '/images/apex-one.jpg',
              backImage: p.back_image_url || p.image_url || '/images/apex-one.jpg',
              color: p.color || 'Jet Black',
              tag: p.tag || '01 / RACE DNA',
              category: p.category || 'Oversized T-shirts',
              description: p.description || '',
              specifications: p.specifications || {
                fit: 'Oversized drop-shoulder fit',
                fabric: '100% Combed Cotton',
                weight: '240 GSM',
                print: 'High-density screen print',
                origin: 'Made in India',
                care: 'Machine wash cold'
              },
              sizes: p.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
              sku: p.sku || `APX-${p.id.slice(0, 4).toUpperCase()}`,
              stock: p.stock ?? 50,
              active: p.active ?? true,
              featured: p.featured ?? true,
              createdAt: p.created_at || new Date().toISOString()
            }));
            setPublishedState(curr => ({ ...curr, products: mapped }));
            setDraftState(curr => ({ ...curr, products: mapped }));
          }
        } catch (err) {
          console.warn('Supabase products fetch skipped:', err);
        }
      })();
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Determine active view state based on preview mode
  const activeState = isDraftMode ? draftState : publishedState;

  // Check if draft has modifications compared to published
  const hasUnpublishedChanges = useMemo(() => {
    return JSON.stringify(draftState) !== JSON.stringify(publishedState);
  }, [draftState, publishedState]);

  // Update draft helper
  const updateDraft = useCallback(<K extends keyof StoreState>(key: K, updater: (prev: StoreState[K]) => StoreState[K]) => {
    setDraftState(prev => {
      const next = { ...prev, [key]: updater(prev[key]) };
      try {
        localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(next));
      } catch (e) { }
      return next;
    });
  }, []);

  // Publish changes
  const publishChanges = useCallback(async () => {
    const nextState = { ...draftState };
    // Add audit log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'Website Published',
      user: 'Administrator',
      details: 'All draft changes published to live storefront'
    };
    nextState.auditLogs = [newLog, ...nextState.auditLogs];

    setPublishedState(nextState);
    setDraftState(nextState);

    try {
      localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(nextState));
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(nextState));
    } catch (e) { }

    // Also sync to Supabase if configured
    const supabase = getSupabase();
    if (supabase) {
      try {
        await (supabase as any).from('website_settings').upsert({
          id: 1,
          site_name: nextState.settings.siteName,
          tagline: nextState.settings.tagline,
          announcement_text: nextState.settings.announcementText,
          accent_color: nextState.settings.accentColor,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Supabase sync warning:', err);
      }
    }

    showToast('All website changes are now LIVE!');
  }, [draftState, showToast]);

  // Discard draft
  const discardDraft = useCallback(() => {
    setDraftState(publishedState);
    try {
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(publishedState));
    } catch (e) { }
    showToast('Draft changes discarded. Reverted to live version.');
  }, [publishedState, showToast]);

  // Restore defaults
  const restoreDefaults = useCallback(() => {
    setDraftState(initialStoreState);
    setPublishedState(initialStoreState);
    try {
      localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(initialStoreState));
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(initialStoreState));
    } catch (e) { }
    showToast('Restored original APEXORA default settings.');
  }, [showToast]);

  // Cart actions
  const addToCart = useCallback((product: Product, size: string, quantity = 1) => {
    const key = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          size,
          color: product.color,
          price: product.price,
          image: product.image,
          quantity
        }
      ];
    });
    showToast(`${product.name} (Size ${size}) added to your bag`);
    setCartDrawerOpen(true);
  }, [showToast]);

  const updateCartQuantity = useCallback((key: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => (item.key === key ? { ...item, quantity: item.quantity + delta } : item))
        .filter(item => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart(prev => prev.filter(i => i.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedDiscount(null);
  }, []);

  // Cart calculations
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedDiscount) return 0;
    if (cartSubtotal < appliedDiscount.minOrderValue) return 0;
    if (appliedDiscount.type === 'percentage') {
      return Math.round((cartSubtotal * appliedDiscount.value) / 100);
    }
    return Math.min(cartSubtotal, appliedDiscount.value);
  }, [appliedDiscount, cartSubtotal]);

  const shippingFee = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (cartSubtotal >= activeState.settings.freeShippingThreshold) return 0;
    return activeState.settings.shippingCharge;
  }, [cartSubtotal, activeState.settings]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount + shippingFee);
  }, [cartSubtotal, discountAmount, shippingFee]);

  const applyCoupon = useCallback((code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = activeState.discounts.find(d => d.code === cleanCode && d.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Code requires a minimum order value of ₹${found.minOrderValue.toLocaleString('en-IN')}`
      };
    }
    setAppliedDiscount(found);
    try {
      localStorage.setItem('apexora_applied_discount_v2', JSON.stringify(found));
    } catch (e) {}
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  }, [activeState.discounts, cartSubtotal]);

  const removeCoupon = useCallback(() => {
    setAppliedDiscount(null);
    try {
      localStorage.removeItem('apexora_applied_discount_v2');
    } catch (e) {}
  }, []);

  const unlockReferralDiscount = useCallback((): DiscountCode => {
    const referralDiscount: DiscountCode = {
      id: 'disc-referral',
      code: 'RIDER20',
      type: 'percentage',
      value: 20,
      minOrderValue: 0,
      usageLimit: 10000,
      usageCount: 1,
      active: true,
      description: '20% Instant Referral Discount — Referral Active'
    };
    setAppliedDiscount(referralDiscount);
    setHasReferred(true);
    try {
      localStorage.setItem('apexora_referred_v2', 'true');
      localStorage.setItem('apexora_applied_discount_v2', JSON.stringify(referralDiscount));
    } catch (e) {}
    showToast('⚡ 20% Instant Referral Discount Unlocked & Applied!');
    return referralDiscount;
  }, [showToast]);

  // Customer order creation
  const createOrder = useCallback(async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Promise<Order> => {
    const orderNumber = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString()
    };

    // Update published orders directly
    setPublishedState(prev => {
      const next = {
        ...prev,
        orders: [newOrder, ...prev.orders]
      };
      try {
        localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(next));
      } catch (e) { }
      return next;
    });

    setDraftState(prev => {
      const next = {
        ...prev,
        orders: [newOrder, ...prev.orders]
      };
      try {
        localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(next));
      } catch (e) { }
      return next;
    });

    // Also decrement stock for ordered items
    updateDraft('products', products =>
      products.map(p => {
        const line = orderData.items.find(i => i.productId === p.id);
        return line ? { ...p, stock: Math.max(0, p.stock - line.quantity) } : p;
      })
    );

    // Sync to Supabase if available
    const supabase = getSupabase();
    if (supabase) {
      try {
        await (supabase as any).from('orders').insert({
          order_number: newOrder.orderNumber,
          customer_name: newOrder.customer.fullName,
          customer_email: newOrder.customer.email,
          customer_phone: newOrder.customer.phone,
          shipping_address: newOrder.customer,
          items: newOrder.items,
          subtotal: newOrder.subtotal,
          discount: newOrder.discount,
          shipping_fee: newOrder.shippingFee,
          total: newOrder.total,
          status: newOrder.status,
          payment_method: newOrder.paymentMethod,
          payment_id: newOrder.paymentId
        });
      } catch (e) {
        console.warn('Supabase order insert warning:', e);
      }
    }

    clearCart();
    return newOrder;
  }, [clearCart, updateDraft]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status'], tracking?: { trackingNumber?: string; carrier?: string }) => {
    const updater = (orders: Order[]) =>
      orders.map(o =>
        o.id === orderId
          ? {
            ...o,
            status,
            ...(tracking?.trackingNumber ? { trackingNumber: tracking.trackingNumber } : {}),
            ...(tracking?.carrier ? { carrier: tracking.carrier } : {})
          }
          : o
      );
    updateDraft('orders', updater);
    setPublishedState(prev => ({ ...prev, orders: updater(prev.orders) }));
    showToast(`Order status updated to ${status}`);
  }, [updateDraft, showToast]);

  // Product CRUD
  const saveProduct = useCallback((product: Product) => {
    updateDraft('products', items => {
      const idx = items.findIndex(p => p.id === product.id);
      if (idx >= 0) {
        const next = [...items];
        next[idx] = product;
        return next;
      }
      return [product, ...items];
    });
    showToast(`Product "${product.name}" saved in draft.`);
  }, [updateDraft, showToast]);

  const deleteProduct = useCallback((productId: string) => {
    updateDraft('products', items => items.filter(p => p.id !== productId));
    showToast('Product removed from catalogue.');
  }, [updateDraft, showToast]);

  const duplicateProduct = useCallback((productId: string) => {
    updateDraft('products', items => {
      const orig = items.find(p => p.id === productId);
      if (!orig) return items;
      const dup: Product = {
        ...orig,
        id: `prod-${Date.now()}`,
        name: `${orig.name} (COPY)`,
        sku: `${orig.sku}-COPY`,
        createdAt: new Date().toISOString()
      };
      return [dup, ...items];
    });
    showToast('Product duplicated.');
  }, [updateDraft, showToast]);

  // Collection CRUD
  const saveCollection = useCallback((col: Collection) => {
    updateDraft('collections', items => {
      const idx = items.findIndex(c => c.id === col.id);
      if (idx >= 0) {
        const next = [...items];
        next[idx] = col;
        return next;
      }
      return [...items, col];
    });
    showToast(`Collection "${col.title}" saved.`);
  }, [updateDraft, showToast]);

  const deleteCollection = useCallback((colId: string) => {
    updateDraft('collections', items => items.filter(c => c.id !== colId));
    showToast('Collection removed.');
  }, [updateDraft, showToast]);

  // Content Pages CRUD
  const savePage = useCallback((page: ContentPage) => {
    updateDraft('pages', items => {
      const idx = items.findIndex(p => p.id === page.id || p.slug === page.slug);
      if (idx >= 0) {
        const next = [...items];
        next[idx] = { ...page, updatedAt: new Date().toISOString() };
        return next;
      }
      return [...items, { ...page, updatedAt: new Date().toISOString() }];
    });
    showToast(`Page "${page.title}" updated.`);
  }, [updateDraft, showToast]);

  const deletePage = useCallback((pageId: string) => {
    updateDraft('pages', items => items.filter(p => p.id !== pageId));
    showToast('Page removed.');
  }, [updateDraft, showToast]);

  // Settings
  const updateSettings = useCallback((newSettings: Partial<WebsiteSettings>) => {
    updateDraft('settings', prev => ({ ...prev, ...newSettings }));
    showToast('Website settings updated in draft.');
  }, [updateDraft, showToast]);

  // Homepage sections
  const updateHomepageSection = useCallback((section: HomepageSection) => {
    updateDraft('homepageSections', sections =>
      sections.map(s => (s.id === section.id ? section : s))
    );
    showToast(`Homepage section "${section.title}" updated.`);
  }, [updateDraft, showToast]);

  const reorderHomepageSections = useCallback((sections: HomepageSection[]) => {
    updateDraft('homepageSections', () => sections);
  }, [updateDraft]);

  // Navigation
  const saveNavItem = useCallback((item: NavigationItem) => {
    updateDraft('navigation', items => {
      const idx = items.findIndex(i => i.id === item.id);
      if (idx >= 0) {
        const next = [...items];
        next[idx] = item;
        return next;
      }
      return [...items, item];
    });
    showToast(`Navigation item "${item.label}" updated.`);
  }, [updateDraft, showToast]);

  const deleteNavItem = useCallback((id: string) => {
    updateDraft('navigation', items => items.filter(i => i.id !== id));
    showToast('Navigation item removed.');
  }, [updateDraft, showToast]);

  // Discounts
  const saveDiscount = useCallback((discount: DiscountCode) => {
    updateDraft('discounts', items => {
      const idx = items.findIndex(d => d.id === discount.id || d.code === discount.code);
      if (idx >= 0) {
        const next = [...items];
        next[idx] = discount;
        return next;
      }
      return [...items, discount];
    });
    showToast(`Discount "${discount.code}" saved.`);
  }, [updateDraft, showToast]);

  const deleteDiscount = useCallback((id: string) => {
    updateDraft('discounts', items => items.filter(d => d.id !== id));
    showToast('Discount code removed.');
  }, [updateDraft, showToast]);

  // Media
  const addMediaItem = useCallback((mediaItem: MediaItem) => {
    updateDraft('media', items => [mediaItem, ...items]);
    showToast(`Media "${mediaItem.name}" added to library.`);
  }, [updateDraft, showToast]);

  const deleteMediaItem = useCallback((id: string) => {
    updateDraft('media', items => items.filter(m => m.id !== id));
    showToast('Media removed.');
  }, [updateDraft, showToast]);

  const value: StoreContextType = {
    products: activeState.products,
    collections: activeState.collections,
    settings: activeState.settings,
    homepageSections: activeState.homepageSections,
    navigation: activeState.navigation,
    pages: activeState.pages,
    orders: activeState.orders,
    customers: activeState.customers,
    discounts: activeState.discounts,
    media: activeState.media,
    auditLogs: activeState.auditLogs,

    cart,
    cartCount,
    cartSubtotal,
    appliedDiscount,
    discountAmount,
    shippingFee,
    cartTotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    hasReferred,
    unlockReferralDiscount,

    cartDrawerOpen,
    setCartDrawerOpen,
    searchModalOpen,
    setSearchModalOpen,
    quickViewProduct,
    setQuickViewProduct,
    toastMessage,
    showToast,

    isDraftMode,
    setIsDraftMode,
    hasUnpublishedChanges,
    draftState,
    updateDraft,
    publishChanges,
    discardDraft,
    restoreDefaults,

    createOrder,
    updateOrderStatus,

    saveProduct,
    deleteProduct,
    duplicateProduct,
    saveCollection,
    deleteCollection,
    savePage,
    deletePage,
    updateSettings,
    updateHomepageSection,
    reorderHomepageSections,
    saveNavItem,
    deleteNavItem,
    saveDiscount,
    deleteDiscount,
    addMediaItem,
    deleteMediaItem
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
