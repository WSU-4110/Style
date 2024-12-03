from django.db import models

# Model for storing customer information
class Customer(models.Model):
    firebase_user_id = models.CharField(max_length=128, unique=True)  
    # Firebase UID, unique to each user, used for authentication and association

    fullname = models.CharField(max_length=250)  r
    email = models.EmailField()  
    city = models.CharField(max_length=100)  
    phone_number = models.CharField(max_length=15, blank=True, null=True)  
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)  

    def __str__(self):
        return self.fullname  
    # String representation of the customer

# Model for storing artist portfolio information
class ArtistPortfolio(models.Model):
    user_profile = models.OneToOneField(Customer, on_delete=models.CASCADE)  
    # One-to-one relationship with Customer, ensuring each artist has a unique portfolio
    # Cascade delete ensures the portfolio is deleted if the customer is removed

    business_name = models.CharField(max_length=250)  
    bio = models.TextField()  
    profile_picture = models.ImageField(upload_to='artist_pics/', null=True, blank=True)  
    photos = models.JSONField()  
    services = models.JSONField()  

    def __str__(self):
        return self.business_name  
    # String representation of the artist portfolio