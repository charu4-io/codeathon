from django.db import models

# Create your models here.
from django.db import models


class Vendor(models.Model):

    CATEGORY_CHOICES = [
        ('food', 'Food / Chaat'),
        ('fruit', 'Fruit Seller'),
        ('flower', 'Flower Seller'),
        ('tea', 'Tea Stall'),
        ('misc', 'Miscellaneous'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    location = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15, blank=True)
    description = models.TextField(blank=True)


    is_female_owned = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    hygiene_rating = models.FloatField(default=3.0)
    service_rating = models.FloatField(default=3.0)

    hygiene_rating_count = models.IntegerField(default=0)
    service_rating_count = models.IntegerField(default=0)

    image_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


from django.utils import timezone
from datetime import timedelta


