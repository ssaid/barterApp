from django.contrib.gis.db import models
from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point
from cities.models import Country, City
from django.contrib.auth.models import AbstractUser
import math
from versatileimagefield.fields import VersatileImageField
from django.utils.text import slugify


# User = get_user_model()

class User(AbstractUser):
    username = models.CharField(max_length=255, unique=False, null=True, blank=True)
    email = models.EmailField(unique=True, null=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class ContactMethod(models.Model):
    name = models.CharField(max_length=20)
    image = VersatileImageField(upload_to='contact_methods', blank=True, null=True)

    def __str__(self):
        return self.name


class UserInformation(models.Model):
    avatar = VersatileImageField(upload_to='avatars/', blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.PointField(geography=True, default=Point(0.0, 0.0))
    # https://raphael-leger.medium.com/django-handle-latitude-and-longitude-54a4bb2f6e3b
    city = models.CharField(max_length=50, blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)
    # contacts: Contact[]
    @property
    def longitude(self):
        return self.location.x
    @property
    def latitude(self):
        return self.location.y

    @staticmethod
    def calculate_distance(point1, point2):
        # Haversine formula for calculating distances between points
        lat1, lon1 = point1.coords
        lat2, lon2 = point2.coords
        radius = 6371  # Earth's radius in kilometers

        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance = radius * c

        return distance

    @classmethod
    def get_coord_info(self, latitude, longitude):
        # Given a latitude and longitude, find the nearest city
        given_point = Point(longitude, latitude)

        nearest_city = None
        min_distance = float('inf')

        for city in City.objects.filter(country__name__iexact="argentina").all():
            city_point = city.location  # Use the 'location' field
            distance = self.calculate_distance(given_point, city_point)
            if distance < min_distance:
                min_distance = distance
                nearest_city = city

        dd = {}
        if nearest_city:
            city_str = f"Nearest city: {nearest_city.name} (Distance: {min_distance:.2f} km)"
            city_name = nearest_city.name
            region_name = nearest_city.region.name
            dd = {
                'city_str': city_str,
                'city_name': nearest_city.name,
                'region_id': str(nearest_city.region.id),
                'country_id': str(nearest_city.country.id),
                # 'city': nearest_city,
            }
        return dd

class Contact(models.Model):
    description = models.CharField(max_length=200)
    contact_method = models.ForeignKey(ContactMethod, on_delete=models.CASCADE)
    user = models.ForeignKey(UserInformation, related_name='contacts' ,on_delete=models.CASCADE)

class Category(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    image = VersatileImageField(upload_to='categories', blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    slug = models.SlugField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id or self.name_changed():
            self.slug = self.generate_unique_slug()
        super(Category, self).save(*args, **kwargs)

    def name_changed(self):
        """Check if name has changed since the last save."""
        try:
            obj = Category.objects.get(id=self.id)
            return obj.name != self.name
        except Category.DoesNotExist:
            return True

    def generate_slug_from_ancestors(self):
        """Recursively generate slug from category and its ancestors."""
        ancestors = [slugify(self.name)]
        parent = self.parent
        while parent:
            ancestors.insert(0, slugify(parent.name))
            parent = parent.parent

        return "-".join(ancestors)

    def generate_unique_slug(self):
        """Generate a unique slug for the category using ancestors' names."""
        base_slug = self.generate_slug_from_ancestors()

        # Check if the slug is unique
        if Category.objects.filter(slug=base_slug).exists():
            raise Exception(f"The slug '{base_slug}' already exists.")

        return base_slug


class Post(models.Model):
    title = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    categories = models.ManyToManyField(Category, related_name='posts')
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    state = models.CharField(max_length=50, choices=[('draft', 'Inactiva'), ('active', 'Activa'), ('done', 'Finalizada')], default='draft')
    interactions = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta: 
        ordering = ['-created_at']


class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = VersatileImageField(upload_to='posts', blank=True, null=True)
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return self.image.url
