from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Case, When, Value, IntegerField, F
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from datetime import timedelta

from .models import Vendor, StreetDeal
from .serializers import VendorSerializer


# 1️⃣ Ranked Vendors API
@api_view(['GET'])
def get_ranked_vendors(request):

    # Auto-expire old deals
    StreetDeal.objects.filter(expiry_time__lt=now()).update(is_active=False)

    vendors = Vendor.objects.annotate(
        deal_weight=Case(
            When(streetdeal__is_active=True, then=Value(100)),
            default=Value(0),
            output_field=IntegerField(),
        ),
        gender_weight=Case(
            When(is_female_owned=True, then=Value(20)),
            default=Value(0),
            output_field=IntegerField(),
        ),
        trust_weight=F('hygiene_rating') * 10
    ).annotate(
        final_rank_score=F('deal_weight') + F('gender_weight') + F('trust_weight')
    ).order_by('-final_rank_score')

    serializer = VendorSerializer(vendors, many=True)
    return Response(serializer.data)


# 2️⃣ Toggle Deal API
@api_view(['POST'])
def toggle_deal(request, vendor_id):

    vendor = get_object_or_404(Vendor, id=vendor_id)

    deal, created = StreetDeal.objects.get_or_create(
        vendor=vendor,
        defaults={
            'description': "Flash Deal",
            'discount_percentage': 30,
            'expiry_time': now() + timedelta(hours=1),
            'is_active': True
        }
    )

    if not created:
        deal.is_active = not deal.is_active
        if deal.is_active:
            deal.expiry_time = now() + timedelta(hours=1)
        deal.save()

    return Response({"message": "Deal toggled"})


# 3️⃣ Rate Vendor API
@api_view(['POST'])
def rate_vendor(request, vendor_id):

    vendor = get_object_or_404(Vendor, id=vendor_id)

    hygiene_score = float(request.data.get("hygiene_score", 0))
    service_score = float(request.data.get("service_score", 0))

    vendor.hygiene_rating = (
        (vendor.hygiene_rating * vendor.hygiene_rating_count + hygiene_score)
        / (vendor.hygiene_rating_count + 1)
    )
    vendor.hygiene_rating_count += 1

    vendor.service_rating = (
        (vendor.service_rating * vendor.service_rating_count + service_score)
        / (vendor.service_rating_count + 1)
    )
    vendor.service_rating_count += 1

    vendor.save()

    return Response({"message": "Rating submitted"})


# 4️⃣ Admin Stats API
@api_view(['GET'])
def admin_stats(request):

    total_vendors = Vendor.objects.count()
    active_deals = Vendor.objects.filter(streetdeal__is_active=True).count()
    female_vendors = Vendor.objects.filter(is_female_owned=True).count()

    return Response({
        "total_vendors": total_vendors,
        "active_deals": active_deals,
        "female_vendors": female_vendors,
    })
