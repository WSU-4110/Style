from django.shortcuts import render
from .models import Data
from django.db.models import Q 

# Create your views here.
def index(request):
    if 'q' in request.GET:
        q = request.GET['q']
        #data = Data.objects.filter(business_type__icontains=q)
        multiple_q = Q(Q(business_type__icontains=q) | Q(business_name__icontains=q) | Q(zipcode__icontains=q))
        data = Data.objects.filter(multiple_q)
       

    else:

        data = Data.objects.all()
    contex = {
        'data' : data
    }
    return render(request, 'dashboard/index.html', contex)