"""artcategory URL Configuration

    The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import home  # Replace 'home' with the actual view functions you have in views.py

urlpatterns = [
    path('', home, name='home'),  # Ensure the view name matches what's in views.py
]


'''
from django.urls import path
from .views import CategoryListView, SearchView

urlpatterns = [
    path('category/categories/', CategoryListView.as_view(), name='category-list'),
    path('search/search/', SearchView.as_view(), name='search'),
]
'''