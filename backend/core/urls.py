from django.urls import path
from . import views

urlpatterns = [

    path('vendors/', views.get_vendors, name='get_vendors'),

    # Dashboard & controls
    path('vendors/<int:pk>/dashboard/', views.vendor_dashboard, name='vendor_dashboard'),
    path('vendors/<int:pk>/toggle-deal/', views.toggle_deal, name='toggle_deal'),
    path('vendors/<int:pk>/update/', views.update_vendor, name='update_vendor'),

    # Existing routes
    path('vendors/<int:id>/rate/', views.rate_vendor, name='rate_vendor'),
    path('vendors/<int:id>/', views.get_vendor_detail, name='get_vendor_detail'),

    path('register-vendor/', views.register_vendor, name='register_vendor'),
]
