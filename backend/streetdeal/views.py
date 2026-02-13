from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

from .models import StreetDeal
from .serializers import StreetDealSerializer


@api_view(['POST'])
def activate_deal(request):
    vendor_id = request.data.get("vendor_id")
    discount = request.data.get("discount")
    description = request.data.get("description")

    if not vendor_id or not discount:
        return Response(
            {"error": "vendor_id and discount are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    deal = StreetDeal.objects.create(
        vendor_id=vendor_id,
        discount=discount,
        description=description
    )

    serializer = StreetDealSerializer(deal)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def deactivate_deal(request, pk):
    try:
        deal = StreetDeal.objects.get(pk=pk)
    except StreetDeal.DoesNotExist:
        return Response({"error": "Deal not found"}, status=404)

    deal.is_active = False
    deal.save()

    return Response({"message": "Deal deactivated"})


@api_view(['GET'])
def active_deals(request):
    deals = StreetDeal.objects.filter(is_active=True)

    for deal in deals:
        deal.check_expiry()

    active = StreetDeal.objects.filter(is_active=True)
    serializer = StreetDealSerializer(active, many=True)

    return Response(serializer.data)
