

from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_cities, name="get_cities"),
    path('search/<str:name>', views.get_cities_by_name, name="search-cities"),
    path('update/', views.update_cities, name='update-cities')
]
