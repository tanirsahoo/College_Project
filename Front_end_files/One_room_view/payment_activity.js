document.addEventListener("DOMContentLoaded", function () {
    let payment = document.getElementById('right_sidebar_submit');
    payment.addEventListener('click', () => {
        // alert("Clicked");
        let populate_area = document.getElementById('payment-area-to-accept-payments');
        populate_area.style.top = `0vh`;
    });

    const stripe = Stripe("pk_test_51RGv3mFMiJyBjLUB8DJicO6iHcOW6eYRTqeK2l8Gq2S6IPqghT1CU1r3OCi3l2HPNdXqyX6Agmr7hqbvh8smC2hu00D0bGTKVh");

    async function initiatePayment() {
        const response = await fetch(payment_endpoint_post + `${bedId}`, {
            method: 'POST'
        });

        const data = await response.json();
        const clientSecret = data.clientSecret;

        const elements = stripe.elements();
        const card = elements.create('card');
        card.mount('#card-element');

        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
        
            // Get user inputs
            const name = document.getElementById('input-name').value;
            const email = document.getElementById('input-email').value;
            const phone = document.getElementById('input-contact').value;
            const city = document.getElementById('input-city').value;
            const state = document.getElementById('input-state').value;
            const country = document.getElementById('input-country').value;
        
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                        phone: phone,
                        address: {
                            city: city,
                            state: state,
                            country: country
                        }
                    }
                }
            });
        
            if (result.error) {
                alert("❌ Payment failed: " + result.error.message);
            } else {
                alert("✅ Payment successful!");
                window.location.href = index_page ;
            }
        });        
    }

    initiatePayment();
});
