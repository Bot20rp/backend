import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51QIewwDhm58X9ebvy0SU8i6cf5kx9K3APMIey80A9r8hWj3aeMUZybaPDhExaFNpsIkevdLH8M6FzOfpdff99E1B001ZF8mnQQ")

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