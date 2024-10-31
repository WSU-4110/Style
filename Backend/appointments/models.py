from django.db import models

class Appointment(models.Model):
    TYPE_CHOICES = [
        ('Facial', 'Facial'),
        ('Haircut', 'Haircut'),
    ]
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Canceled', 'Canceled'),
    ]
class Appointment(models.Model):
    business_name = models.CharField(max_length=255)
    service = models.CharField(max_length=255)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    time = models.TimeField()
    address = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Scheduled')

    def __str__(self):
        return f"{self.business_name} - {self.service} ({self.type}) - {self.status}"
