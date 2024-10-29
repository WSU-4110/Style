from django.shortcuts import render
from .models import Type

# Create your views here.
def home(request):
    types = Type.objects.all()
    return render(request, 'home.html', {'types':types})