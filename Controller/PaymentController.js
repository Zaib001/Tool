const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentController = {
  async create(req, res, next) {
    try {
      const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Promote Your AI Tools',
            },
            unit_amount: 5499, // Amount in cents ($54.99)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.FRONTEND_URL + "/promotion-form",
      cancel_url: process.env.FRONTEND_URL + "?canceled=true",
    });

    res.json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = paymentController;
