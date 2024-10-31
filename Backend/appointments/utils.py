from django.core.mail import send_mail

def send_cancellation_notification(appointment):
    # Placeholder
    customer_email = "customer@example.com"  # retrieve from appointment
    esthetician_email = "esthetician@example.com"  # retrieve from business/service

    subject = f"Appointment Cancellation - {appointment.service}"
    message = f"Dear customer, your {appointment.service} appointment at {appointment.business_name} has been canceled."

    # Sending an email to both customer & esthetician
    send_mail(subject, message, 'noreply@style.com', [customer_email, esthetician_email])
