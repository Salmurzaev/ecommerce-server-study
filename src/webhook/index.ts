import { Request, Response } from 'express'
import stripe from 'stripe'
import Order from '../models/order'

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export const webhookHandler = async (req: Request, res: Response) => {
  try {
    const sig = req.headers['stripe-signature'] as string
    const body: string = req.body
    const event = stripeClient.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK)

    if (event.type === 'payment_intent.created') {
      const charge = event.data.object as stripe.Charge
      const order = await Order.findOne({
        paymentIntentId: charge.payment_intent
      })
      if (order) {
        order.paymentStatus = 'paid'
        order.paymentDetails = charge
        await order.save()
      }
    }
    res.send({ received: true })
  } catch (error) {
    console.log(error, 'Error in webhookHandler')
    throw error
  }
}
