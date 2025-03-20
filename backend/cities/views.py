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


def update_cities(request):
    # Manually trigger update from government API

    # Here codeRegion is 11 for Ile de France
    response = requests.get('https://geo.api.gouv.fr/communes?codeRegion=11')
    data = response.json()

    # Remove duplicate cities
    unique = {each['nom']: each for each in data}.values()

    for city in unique:
        City.objects.update_or_create(
            name=city['nom'],
            defaults={
                'postal_codes': city['codesPostaux'],
                'name': city['nom'],
                'population': city['population'],
                'region_code': city['codeRegion']
            }
        )

    return JsonResponse({"message": "Cities updated !"})
