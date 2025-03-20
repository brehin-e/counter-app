from django.db import models
from django.contrib.postgres.fields import ArrayField

class City(models.Model):
    name = models.CharField(max_length=255, unique=True)
    postal_codes = ArrayField(models.CharField(max_length=10))
    population = models.IntegerField()
    region_code = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.postal_codes})"