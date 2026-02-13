from django.contrib import admin
from .models import Vendor


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
        'location',
        'is_female_owned',
        'is_verified',
        'hygiene_rating',
        'service_rating',
    )



