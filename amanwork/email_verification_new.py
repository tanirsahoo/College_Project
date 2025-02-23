from flask import Flask, request, jsonify, redirect, url_for
import smtplib
import secrets
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# Store pending verifications
pending_verifications = {}

# SMTP Configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "tanir.sahoo.2023@gmail.com"
EMAIL_PASSWORD = "#Tanir2002"

@app.route('/send_verification', methods=['POST'])
def send_verification():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    # Generate a unique token
    token = secrets.token_urlsafe(16)
    pending_verifications[token] = email
    
    # Construct verification link
    verification_link = f"http://localhost:5000/verify/{token}"
    
    # Send email
    subject = "Email Verification"
    message = f"Click the link to verify your email: {verification_link}"
    send_email(email, subject, message)
    
    return jsonify({"message": "Verification email sent"})

@app.route('/verify/<token>', methods=['GET'])
def verify_email(token):
    email = pending_verifications.get(token)
    if not email:
        return jsonify({"error": "Invalid or expired token"}), 400
    
    # Remove token from pending verifications
    del pending_verifications[token]
    
    # Notify the external endpoint
    response = requests.post("https://xyz_testign.com/mailverified", json={"email": email, "status": "verified"})
    
    if response.status_code == 200:
        return "Email verified successfully!", 200
    else:
        return "Verification failed!", 500

def send_email(to_email, subject, message):
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        server.quit()
    except Exception as e:
        print("Error sending email:", e)

if __name__ == '__main__':
    app.run(debug=True)