from .models import Appointment
from datetime import datetime, timedelta

class AppointmentFactory:
    @staticmethod
    def create_appointment(data):
        appointment_type = data.get('type')

        if appointment_type == 'Facial':
            return FacialAppointment.create(data)
        elif appointment_type == 'Haircut':
            return HaircutAppointment.create(data)
        else:
            raise ValueError("Invalid appointment type")

class FacialAppointment:
    @staticmethod
    def create(data):
        return Appointment.objects.create(
            business_name=data['business_name'],
            service=data['service'],
            amount_due=data['amount_due'],
            date=data['date'],
            time=data['time'],
            address=data['address'],
            type='Facial',
            status='Scheduled'
        )

    @staticmethod
    def can_cancel(appointment):
        # 24-hour cancellation rule placeholder
        if appointment.date <= datetime.now().date() and appointment.time <= (datetime.now() + timedelta(hours=24)).time():
            return False
        return True

class HaircutAppointment:
    @staticmethod
    def create(data):
        return Appointment.objects.create(
            business_name=data['business_name'],
            service=data['service'],
            amount_due=data['amount_due'],
            date=data['date'],
            time=data['time'],
            address=data['address'],
            type='Haircut',
            status='Scheduled'
        )

    @staticmethod
    def can_cancel(appointment):
        if appointment.date <= datetime.now().date() and appointment.time <= (datetime.now() + timedelta(hours=24)).time():
            return False
        return True
