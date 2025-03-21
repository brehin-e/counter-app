from django.http import JsonResponse
from .models import City
import logging
import requests

logger = logging.getLogger('citiesLogger')


def get_cities(request):
    cities = list(City.objects.values("name", "postal_codes", "population", "region_code"))
    return JsonResponse({'cities': cities})

def get_cities_by_name(request, name):
    cities = City.objects.filter(name=name)
    if cities.exists():
        city_list = list(cities.values("name", "postal_codes", "population", "region_code"))
        return JsonResponse({ "cities": city_list })
    else:
        return JsonResponse({ "message": "No Cities found" }, status=404)

