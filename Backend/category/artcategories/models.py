from django.db import models

# Create your models here

class Category(models.Model):
    name = models.CharField(max_length = 100)

    def _str_(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'categories'

class Type(models.Model):
     image = models.ImageField(upload_to='uploads/types/')
     category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
     name = models.CharField(max_length=200)
     description = models.CharField(max_length=500, default='', blank=True, null=True)

     
     def _str_(self):
        return self.name
     



