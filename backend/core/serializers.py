from rest_framework import serializers
from .models import Vendor
from streetdeal.models import StreetDeal
from django.utils import timezone


class VendorSerializer(serializers.ModelSerializer):
    is_high_hygiene = serializers.SerializerMethodField()
    is_female_boosted = serializers.SerializerMethodField()
    is_deal_active = serializers.SerializerMethodField()
    discount = serializers.SerializerMethodField()
    deal_description = serializers.SerializerMethodField()
    expiry_time = serializers.SerializerMethodField()
    final_score = serializers.SerializerMethodField()

    class Meta:
        model = Vendor
        fields = "__all__"

    def get_is_high_hygiene(self, obj):
        return obj.hygiene_rating >= 4.5

    def get_is_female_boosted(self, obj):
        return obj.is_female_owned

    def get_is_deal_active(self, obj):
        deal = obj.deals.filter(is_active=True).first()
        if deal and deal.expiry_time and deal.expiry_time < timezone.now():
            deal.is_active = False
            deal.save()
            return False
        return deal is not None


    def get_discount(self, obj):
        deal = obj.deals.filter(is_active=True, expiry_time__gt=timezone.now()).first()
        return deal.discount if deal else None

    def get_deal_description(self, obj):
        deal = obj.deals.filter(is_active=True, expiry_time__gt=timezone.now()).first()
        return deal.description if deal else None

    def get_expiry_time(self, obj):
        deal = obj.deals.filter(is_active=True, expiry_time__gt=timezone.now()).first()
        return deal.expiry_time if deal else None

    def get_final_score(self, obj):
        score = 0

        deal = obj.deals.filter(is_active=True, expiry_time__gt=timezone.now()).first()
        if deal:
            score += 100

        if obj.is_female_owned:
            score += 20

        score += obj.hygiene_rating * 10

        return score


class VendorRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = [
            "name",
            "category",
            "location",
            "is_female_owned",
            "image_url"
        ]
