from rest_framework import serializers
from .models import StreetDeal


class StreetDealSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreetDeal
        fields = '__all__'
