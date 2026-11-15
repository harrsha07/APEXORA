'use server';

import crypto from 'crypto';

export async function processCheckoutAction(data: {
  items: any[];
  customer: any;
  total: number;
  paymentMethod: string;
}) {
  try {
    const { items, customer, total, paymentMethod } = data;
    if (!items || !items.length || !customer || !total) {
      return { success: false, error: 'Missing required order details' };
    }

    const orderNumber = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayOrderId = razorpayKeyId && paymentMethod === 'Razorpay' ? `order_${Date.now()}` : undefined;

    return {
      success: true,
      orderNumber,
      razorpayOrderId,
      amount: total,
      currency: 'INR'
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Checkout failed' };
  }
}

export async function verifyPaymentAction(data: {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (secret && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return { success: false, error: 'Invalid payment signature' };
      }
    }

    return {
      success: true,
      verified: true,
      paymentId: razorpay_payment_id || `demo_pay_${Date.now()}`
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function trackOrderAction(orderId: string) {
  if (!orderId) {
    return { error: 'Order ID is required' };
  }
  return {
    orderNumber: orderId,
    status: 'Shipped',
    carrier: 'Blue Dart Express',
    trackingNumber: 'BLUEDART-88291041',
    estimatedDelivery: '3 to 5 business days'
  };
}
