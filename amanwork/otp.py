from flask import Flask, request, jsonify, session
from flask_mail import Mail, Message
import random
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'terra.nest.job@gmail.com'
app.config['MAIL_PASSWORD'] = 'eowl pxaf yqbx mvoq'

mail = Mail(app)

def generate_otp():
    """Generate a 6-digit OTP."""
    return str(random.randint(100000, 999999))

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    otp = generate_otp()
    session['otp'] = otp
    session['email'] = email

    try:
        msg = Message('Email Verification Code', sender=app.config['MAIL_USERNAME'], recipients=[email])
        msg.body =  f'''Thank you for signing up with TerraNest, your trusted partner for finding the perfect PG accommodation!

To complete your registration, please verify your email address. 
Use the following code to verify:

Your verification code is: {otp}

If you didn't request this, you can ignore this email.

Welcome to TerraNest, where your next home awaits!

Best regards,
Team TerraNest'''
        mail.send(msg)
        return jsonify({'message': 'OTP sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    entered_otp = data.get('otp')

    if 'otp' not in session or 'email' not in session:
        return jsonify({'error': 'No OTP has been sent'}), 400

    if not entered_otp:
        return jsonify({'error': 'OTP is required'}), 400

    if entered_otp == session['otp']:
        # OTP is valid; clear the session
        session.pop('otp', None)
        session.pop('email', None)
        return jsonify({'message': 'OTP verified successfully'}), 200
    else:
        return jsonify({'error': 'Invalid OTP'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9500)
