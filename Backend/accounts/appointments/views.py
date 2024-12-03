import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.conf import settings
from .models import Appointment  # Ensure correct import path for the model
from accounts.firebase_config import db, auth  # Use absolute import

# Set up logging
logger = logging.getLogger(__name__)

# Fetch all appointments
@require_http_methods(["GET"])
def get_appointments(request):
    try:
        appointments = Appointment.objects.all().values()
        return JsonResponse(list(appointments), safe=False)
    except Exception as e:
        logger.error(f"Unexpected error while fetching appointments: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)

# Create a new appointment
@csrf_exempt
@require_http_methods(["POST"])
def create_appointment(request):
    try:
        # Verify the Firebase token
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Invalid or missing Authorization header"}, status=401)

        token = auth_header.split('Bearer ')[-1]
        decoded_token = auth.verify_id_token(token)
        user_email = decoded_token.get('email')

        if not user_email:
            return JsonResponse({"error": "Email not found in Firebase user data"}, status=400)

        data = json.loads(request.body)

        # Check for missing keys
        required_keys = ['business_name', 'service', 'amount_due', 'date', 'time', 'address']
        for key in required_keys:
            if key not in data:
                return JsonResponse({"error": f"Missing key: {key}"}, status=400)

        appointment = Appointment.objects.create(
            business_name=data['business_name'],
            service=data['service'],
            amount_due=data['amount_due'],
            date=data['date'],
            time=data['time'],
            address=data['address']
        )

        # Email confirmation
        send_mail(
            subject='Appointment Confirmation',
            message=f"Hello, your appointment for {appointment.service} on {appointment.date} at {appointment.time} has been booked.",
            from_email='noreplystyle@gmail.com',
            recipient_list=[user_email],
            fail_silently=False,
        )

        return JsonResponse({"id": appointment.id, "success": "Appointment created"}, status=201)

    except KeyError as e:
        logger.error(f"Missing key: {str(e)}")
        return JsonResponse({"error": f"Missing key: {str(e)}"}, status=400)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)

# Retrieve a specific appointment
@require_http_methods(["GET"])
def get_appointment(request, id):
    try:
        appointment = Appointment.objects.filter(id=id).values().first()
        if not appointment:
            return JsonResponse({"error": "Appointment not found"}, status=404)
        return JsonResponse(appointment)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)

# Update an appointment
@csrf_exempt
@require_http_methods(["PUT"])
def update_appointment(request, id):
    try:
        data = json.loads(request.body)

        # Update appointment in the database
        updated_count = Appointment.objects.filter(id=id).update(
            business_name=data['business_name'],
            service=data['service'],
            amount_due=data['amount_due'],
            date=data['date'],
            time=data['time'],
            address=data['address']
        )

        if updated_count == 0:
            return JsonResponse({"error": "Appointment not found"}, status=404)

        return JsonResponse({"success": "Appointment updated"}, status=200)

    except KeyError as e:
        logger.error(f"Missing key: {str(e)}")
        return JsonResponse({"error": f"Missing key: {str(e)}"}, status=400)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)

# Delete an appointment
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_appointment(request, id):
    try:
        deleted_count, _ = Appointment.objects.filter(id=id).delete()
        if deleted_count == 0:
            return JsonResponse({"error": "Appointment not found"}, status=404)
        return JsonResponse({"success": "Appointment deleted"}, status=200)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)
