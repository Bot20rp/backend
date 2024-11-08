import Stripe from 'stripe';


const stripe = new Stripe(process.env.KEY_STRIPE)

export const tarjet = async (req, res) => {
    console.log(req.body);

    const { id, amount } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "GAMING WORD",
            payment_method: id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'  // Evita métodos que requieran redirección
            }
        });
        console.log(payment);
        res.send({ message: 'Payment successful' });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ message: 'Payment failed', error: error.message });
    }
};