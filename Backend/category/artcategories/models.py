from django.db import models  # Importing Django's models module to define database models

# Category Model: Represents a category for Types
class Category(models.Model):
    name = models.CharField(max_length=100)  # 'name' field to store the category name with a max length of 100 characters

    # This method returns the name of the category when the model instance is printed
    def __str__(self):
        return self.name
    
    # Meta class is used to specify metadata about the model
    # Here, we specify the plural name of the model as 'categories'
    class Meta:
        verbose_name_plural = 'categories'

# Type Model: Represents a specific type, associated with a category
class Type(models.Model):
    image = models.ImageField(upload_to='uploads/types/')  # 'image' field to store an image file, uploaded to the 'uploads/types/' directory
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)  # ForeignKey field linking each Type to a Category; default is set to 1
    name = models.CharField(max_length=200)  # 'name' field to store the type name with a max length of 200 characters
    description = models.CharField(max_length=500, default='', blank=True, null=True)  # Optional description field with max length of 500 characters

    # This method returns the name of the type when the model instance is printed
    def __str__(self):
        return self.name
