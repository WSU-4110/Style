from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email_host = models.CharField(max_length=255, default='smtp.gmail.com')
    email_port = models.IntegerField(default=587)
    email_user = models.EmailField()
    email_password = models.CharField(max_length=255)
    use_tls = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username
