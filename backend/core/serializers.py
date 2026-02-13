from rest_framework import serializers
from .models import Vendor

class VendorSerializer(serializers.ModelSerializer):
    deal_active = serializers.SerializerMethodField()
    badges = serializers.SerializerMethodField()

    class Meta:
        model = Vendor
        fields = '__all__'

    def get_deal_active(self, obj):
        if hasattr(obj, 'streetdeal'):
            return obj.streetdeal.is_active
        return False

    def get_badges(self, obj):
        badges = []

        if obj.hygiene_rating > 4.5:
            badges.append("TRUST_SHIELD")

        if obj.is_female_owned:
            badges.append("EMPOWERMENT")

        if hasattr(obj, 'streetdeal') and obj.streetdeal.is_active:
            badges.append("URGENT_DEAL")

        return badges
