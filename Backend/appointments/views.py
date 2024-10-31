from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Appointment
from .factories import AppointmentFactory, FacialAppointment, HaircutAppointment
from .utils import send_cancellation_notification
import json

# Fetch all appointments
def get_appointments(request):
    appointments = Appointment.objects.all().values()
    return JsonResponse(list(appointments), safe=False)

# Updated create a new appointment
@csrf_exempt
def create_appointment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            appointment = AppointmentFactory.create_appointment(data)
            return JsonResponse({"id": appointment.id}, status=201)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)

# Retrieve a specific appointment
def get_appointment(request, id):
    appointment = Appointment.objects.filter(id=id).values().first()
    if appointment:
        return JsonResponse(appointment)
    return JsonResponse({"error": "Appointment not found"}, status=404)

# Update an appointment
@csrf_exempt
def update_appointment(request, id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        Appointment.objects.filter(id=id).update(
            business_name=data['business_name'],
            service=data['service'],
            amount_due=data['amount_due'],
            date=data['date'],
            time=data['time'],
            address=data['address']
        )
        return JsonResponse({"success": "Appointment updated"}, status=200)
    return JsonResponse({"error": "Invalid method"}, status=405)

# Delete an appointment
@csrf_exempt
def delete_appointment(request, id):
    if request.method == 'DELETE':
        Appointment.objects.filter(id=id).delete()
        return JsonResponse({"success": "Appointment deleted"}, status=204)
    return JsonResponse({"error": "Invalid method"}, status=405)

# Cancel appointment
def cancel_appointment(request, id):
    if request.method == 'POST':
        appointment = Appointment.objects.filter(id=id).first()
        if not appointment:
            return JsonResponse({"error": "Appointment not found"}, status=404)

        # Check if appointment is eligible for cancellation
        if appointment.type == 'Facial' and not FacialAppointment.can_cancel(appointment):
            return JsonResponse({"message": "Cancellation within 24 hours may incur a fee"}, status=200)
        elif appointment.type == 'Haircut' and not HaircutAppointment.can_cancel(appointment):
            return JsonResponse({"message": "Cannot cancel this appointment type within the given timeframe"}, status=200)

        # Cancel and update
        appointment.status = 'Canceled'
        appointment.save()

        # Cancellation notification
        send_cancellation_notification(appointment)

        return JsonResponse({"success": "Appointment canceled"}, status=200)
    return JsonResponse({"error": "Invalid method"}, status=405)
