from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Appointment
import json

# Fetch all appointments
def get_appointments(request):
    appointments = Appointment.objects.all().values()
    return JsonResponse(list(appointments), safe=False)

# Create a new appointment
@csrf_exempt
def create_appointment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        appointment = Appointment.objects.create(
            business_name=data['business_name'],
            service=data['service'],
            amount_due=data['amount_due'],
            date=data['date'],
            time=data['time'],
            address=data['address']
        )
        return JsonResponse({"id": appointment.id}, status=201)

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
