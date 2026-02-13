from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vendor
from .serializers import VendorSerializer


@api_view(['GET'])
def get_vendors(request):
    vendors = Vendor.objects.all()
    serializer = VendorSerializer(vendors, many=True)
    return Response(serializer.data)

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


