from django.shortcuts import render
from .models import Type, Category
from django.db.models import Q

def home(request):
    query = request.GET.get('q')
    if query:
        types = Type.objects.filter(
            Q(name__icontains=query) | 
            Q(category__name__icontains=query)
        )
    else:
        types = Type.objects.all()
    return render(request, 'home.html', {'types': types, 'query': query})
