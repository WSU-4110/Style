from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Associate with Django User
    fullname = models.CharField(max_length=100)
    email = models.EmailField()
    city = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Optional field
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.fullname


class Business(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)  # Associate with Django User
    business_name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Optional field
    logo = models.ImageField(upload_to='business_logos/', blank=True, null=True)

    def __str__(self):
        return self.business_name
