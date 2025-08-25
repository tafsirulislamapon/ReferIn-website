import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Add debugging
console.log('Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('Stripe Secret Key starts with sk_:', process.env.STRIPE_SECRET_KEY?.startsWith('sk_'));

// Add proper error handling for missing environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY environment variable is not set');
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

// Validate the key format
if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  console.error('STRIPE_SECRET_KEY does not start with sk_');
  throw new Error('Invalid STRIPE_SECRET_KEY format');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    console.log('API route called');
    
    const { priceId, userId, successUrl, cancelUrl } = await req.json();
    console.log('Success url:', successUrl);
    
    console.log('Request data:', { priceId, userId, successUrl, cancelUrl });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
      },
    });

    console.log('Stripe session created successfully:', session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorType = error instanceof Error ? error.constructor.name : 'Unknown';
    
    console.error('Error creating checkout session:', error);
    console.error('Error details:', errorMessage);
    console.error('Error type:', errorType);
    
    return NextResponse.json(
      { error: `Error creating checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
