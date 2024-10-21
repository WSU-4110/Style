from django.db import models

# Create your models here.
class Data(models.Model):
    business_type = models.CharField(max_length = 100)
    business_name = models.CharField(max_length = 100)
    zipcode = models.PositiveIntegerField(default=0)

    def _str_(self):
        return self.business_type

