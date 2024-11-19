from django.db import models

# Category Model: Represents a category for Types
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Ensuring category names are unique to prevent duplicates

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'categories'

# Type Model: Represents a specific type, associated with a category
class Type(models.Model):
    image = models.ImageField(upload_to='uploads/types/')  # Image field for storing uploaded images
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE,
        related_name='types'  # Optional: allows reverse access from Category to Type
    )
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500, default='', blank=True, null=True)

    def __str__(self):
        return self.name
