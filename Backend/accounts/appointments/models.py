from django.db import models

class Appointment(models.Model):
    business_name = models.CharField(max_length=255)
    service = models.CharField(max_length=255)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    time = models.TimeField()
    address = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)

    def __str__(self):
        return f"{self.business_name} - {self.service}"
