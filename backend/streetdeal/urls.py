from django.urls import path
from . import views

urlpatterns = [
    path('activate/', views.activate_deal),
    path('<int:pk>/deactivate/', views.deactivate_deal),
    path('active/', views.active_deals),
]
