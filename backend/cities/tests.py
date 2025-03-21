from django.test import TestCase
from django.urls import reverse
from .models import City

class CityTestCase(TestCase):
    def setUp(self):
        City.objects.create(name="Tours", postal_codes=[
            "37000",
            "37100",
            "37200"
        ], population=138668, region_code=24)
        City.objects.create(name="Strasbourg", postal_codes=[
            "67000",
            "67100",
            "67200"
        ], population=291709, region_code=44)

    def test_get_cities_url(self):
        response = self.client.get(reverse("get_cities"))
        self.assertEqual(response.status_code, 200)
        self.assertIn("cities", response.json())

    def test_get_cities_by_name_url_found(self):
        response = self.client.get(reverse("search-cities", args=["Tours"]))
        self.assertEqual(response.status_code, 200)
        self.assertIn("cities", response.json())
        self.assertEqual(response.json()["cities"][0]["name"], "Tours")
    
    def test_get_cities_by_name_url_not_found(self):
        response = self.client.get(reverse("search-cities", args=["Paris"]))
        self.assertEqual(response.status_code, 404)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], "No Cities found")