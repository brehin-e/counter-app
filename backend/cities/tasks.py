import requests
from celery import shared_task
from .models import City
import logging

logger = logging.getLogger('citiesLogger')

@shared_task
def fetch_and_update_cities():
    # Manually trigger update from government API

    # Here codeRegion is 11 for Ile de France
    response = requests.get('https://geo.api.gouv.fr/communes?codeRegion=11')

    if response.status_code == 200:

        data = response.json()

        # Remove duplicate cities
        unique = {each['nom']: each for each in data}.values()

        for city in unique:
            name = city.get("nom")
            postal_codes = city.get('codesPostaux') if city.get('codesPostaux') else []
            population = int(city['population']) if city['population'] else 0
            region_code = int(city['codeRegion']) if city['codeRegion'] else 0

            City.objects.update_or_create(
                name=name,
                defaults={
                    'postal_codes': postal_codes,
                    'name': name,
                    'population': population,
                    'region_code': region_code
                }
            )
        return f"Stored {len(unique)} cities"
    return "Failed to fetch cities"
