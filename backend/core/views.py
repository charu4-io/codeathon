from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vendor
from .serializers import VendorSerializer, VendorRegistrationSerializer
from django.utils import timezone


# ---------------------------
# GET ALL VENDORS (Sorted)
# ---------------------------
@api_view(['GET'])
def get_vendors(request):
    vendors = Vendor.objects.all()
    serializer = VendorSerializer(vendors, many=True)
    data = serializer.data

    # Sort by final_score descending
    sorted_data = sorted(data, key=lambda x: x["final_score"], reverse=True)

    return Response({
        "success": True,
        "data": sorted_data
    })


# ---------------------------
# GET SINGLE VENDOR DETAIL
# ---------------------------
@api_view(['GET'])
def get_vendor_detail(request, id):
    try:
        vendor = Vendor.objects.get(id=id)
        serializer = VendorSerializer(vendor)
        return Response(serializer.data)
    except Vendor.DoesNotExist:
        return Response({"error": "Vendor not found"}, status=404)


# ---------------------------
# RATE VENDOR
# ---------------------------
@api_view(['POST'])
def rate_vendor(request, vendor_id):
    try:
        vendor = Vendor.objects.get(id=vendor_id)
    except Vendor.DoesNotExist:
        return Response({"error": "Vendor not found"}, status=404)

    hygiene_score = request.data.get("hygiene_score")
    service_score = request.data.get("service_score")

    # Hygiene rating update
    if hygiene_score is not None:
        hygiene_score = float(hygiene_score)
        total = vendor.hygiene_rating * vendor.hygiene_rating_count
        vendor.hygiene_rating_count += 1
        vendor.hygiene_rating = (total + hygiene_score) / vendor.hygiene_rating_count

    # Service rating update
    if service_score is not None:
        service_score = float(service_score)
        total = vendor.service_rating * vendor.service_rating_count
        vendor.service_rating_count += 1
        vendor.service_rating = (total + service_score) / vendor.service_rating_count

    vendor.save()

    return Response({
        "message": "Rating updated successfully",
        "hygiene_rating": vendor.hygiene_rating,
        "service_rating": vendor.service_rating
    })


# ---------------------------
# REGISTER VENDOR
# ---------------------------
@api_view(['POST'])
def register_vendor(request):
    serializer = VendorRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        vendor = serializer.save()
        return Response({
            "message": "Vendor registered successfully",
            "vendor_id": vendor.id
        }, status=201)
    return Response(serializer.errors, status=400)


# ---------------------------
# DASHBOARD VIEW
# ---------------------------
@api_view(['GET'])
def vendor_dashboard(request, pk):
    try:
        vendor = Vendor.objects.get(pk=pk)
    except Vendor.DoesNotExist:
        return Response({"error": "Vendor not found"}, status=404)

    deal_weight = 100 if vendor.active_deal else 0
    female_boost = 20 if vendor.is_female_owned else 0
    hygiene_score = vendor.hygiene_rating * 10

    rank_score = deal_weight + female_boost + hygiene_score

    return Response({
        "id": vendor.id,
        "name": vendor.name,
        "category": vendor.category,
        "location": vendor.location,
        "hygiene_rating": vendor.hygiene_rating,
        "service_rating": vendor.service_rating,
        "is_female_owned": vendor.is_female_owned,
        "active_deal": vendor.active_deal,
        "deal_discount": vendor.deal_discount,
        "deal_description": vendor.deal_description,
        "rank_score": rank_score
    })


# ---------------------------
# TOGGLE DEAL
# ---------------------------
@api_view(['PUT'])
def toggle_deal(request, pk):
    try:
        vendor = Vendor.objects.get(pk=pk)
    except Vendor.DoesNotExist:
        return Response({"error": "Vendor not found"}, status=404)

    vendor.active_deal = not vendor.active_deal

    if vendor.active_deal:
        vendor.deal_discount = request.data.get("deal_discount", 20)
        vendor.deal_description = request.data.get("deal_description", "Flash Deal")
    else:
        vendor.deal_discount = 0
        vendor.deal_description = ""

    vendor.save()

    return Response({"message": "Deal updated successfully"})


# ---------------------------
# UPDATE VENDOR PROFILE
# ---------------------------
@api_view(['PUT'])
def update_vendor(request, pk):
    try:
        vendor = Vendor.objects.get(pk=pk)
    except Vendor.DoesNotExist:
        return Response({"error": "Vendor not found"}, status=404)

    vendor.name = request.data.get("name", vendor.name)
    vendor.category = request.data.get("category", vendor.category)
    vendor.location = request.data.get("location", vendor.location)
    vendor.is_female_owned = request.data.get("is_female_owned", vendor.is_female_owned)

    vendor.save()

    return Response({"message": "Vendor updated successfully"})
