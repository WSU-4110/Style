from django.urls import path
from .views import (
    get_appointments,
    create_appointment,
    get_appointment,
    update_appointment,
    delete_appointment,
)

urlpatterns = [
    path('api/appointments/', get_appointments, name='get_appointments'),  # Get all appointments
    path('api/appointments/create/', create_appointment, name='create_appointment'),  # Create a new appointment
    path('api/appointments/<int:id>/', get_appointment, name='get_appointment'),  # Get a specific appointment
    path('api/appointments/<int:id>/update/', update_appointment, name='update_appointment'),  # Update an appointment
    path('api/appointments/<int:id>/delete/', delete_appointment, name='delete_appointment'),  # Delete an appointment
]
