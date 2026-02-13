from django.db import models
from django.utils import timezone
from datetime import timedelta
from core.models import Vendor


class StreetDeal(models.Model):
    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE,
        related_name="deals",
        null=True,
        blank=True
    )

    discount = models.IntegerField()
    description = models.CharField(max_length=200)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_time = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.expiry_time:
            self.expiry_time = timezone.now() + timedelta(hours=1)
        super().save(*args, **kwargs)

    def check_expiry(self):
        if self.expiry_time and self.expiry_time < timezone.now():
            self.is_active = False
            super().save()

    def __str__(self):
        return f"{self.vendor.name if self.vendor else 'No Vendor'} - {self.discount}%"
