import random
import string
import yagmail
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# Function to generate a random verification code
def generate_verification_code(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

# Function to send an email with the verification code
def send_verification_email(receiver_email, verification_code, sender_email, sender_password):
    smtp_server = "smtp.gmail.com"
    port = 587  # Use 587 for TLS connection
    
    # Create the email message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "Email Verification Code"
    
    body = f'''Thank you for signing up with TerraNest, your trusted partner for finding the perfect PG accommodation!

To complete your registration, please verify your email address. 
Use the following code to verify:

Your verification code is: {verification_code}

If you didn’t request this, you can ignore this email.

Welcome to TerraNest, where your next home awaits!

Best regards,
Team TerraNest'''
    message.attach(MIMEText(body, "plain"))

    # Establish connection and send email
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_server, port) as server:
            server.starttls(context=context)  # Upgrade connection to secure
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        print("Verification email sent successfully.")
    except Exception as e:
        print(f"Error sending email: {e}")


# Function to verify the code entered by the user
def verify_code(input_code, actual_code):
    if input_code == actual_code:
        print("Verification successful!")
    else:
        print("Invalid verification code. Please try again.")

# Main function to execute the flow
def main():
    sender_email = '''terra.nest.job@gmail.com'''
    sender_password ='''eowlpxafyqbxmvoq'''
    receiver_email = input("Enter the recipient's email address: ")
    
    # Step 1: Generate a verification code
    verification_code = generate_verification_code()
    
    # Step 2: Send the verification email
    send_verification_email(receiver_email, verification_code, sender_email, sender_password)
    
    # Step 3: Ask the user for the verification code and verify
    input_code = input("Enter the verification code sent to your email: ")
    verify_code(input_code, verification_code)

if __name__ == "__main__":
    main()
