from django.db import models
from django.utils import timezone
from datetime import timedelta


class StreetDeal(models.Model):
    vendor_id = models.IntegerField()  # Temporary until Vendor model ready

    discount = models.IntegerField()
    description = models.CharField(max_length=200)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_time = models.DateTimeField()

    def save(self, *args, **kwargs):
        # Auto-set expiry to 1 hour if not set
        if not self.expiry_time:
            self.expiry_time = timezone.now() + timedelta(hours=1)
        super().save(*args, **kwargs)

    def check_expiry(self):
        if self.expiry_time < timezone.now():
            self.is_active = False
            self.save()

    def __str__(self):
        return f"Deal for Vendor {self.vendor_id} - {self.discount}%"
