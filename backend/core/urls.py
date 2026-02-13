from django.urls import path
from . import views

urlpatterns = [
    path('vendors/', views.get_vendors, name='get_vendors'),
    path('vendor/<int:vendor_id>/rate/', views.rate_vendor, name='rate_vendor'),
    path('register-vendor/', views.register_vendor, name='register_vendor'),

]
