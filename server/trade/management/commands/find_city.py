from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from cities.models import City
import math

# USAGE: python manage.py find_city "-34.5888903" "-58.6400805"

class Command(BaseCommand):
    help = 'Find the nearest city based on latitude and longitude'

    def add_arguments(self, parser):
        parser.add_argument('latitude', type=float)
        parser.add_argument('longitude', type=float)

    def calculate_distance(self, point1, point2):
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

    def handle(self, *args, **options):
        latitude = options['latitude']
        longitude = options['longitude']
        given_point = Point(longitude, latitude)

        nearest_city = None
        min_distance = float('inf')

        for city in City.objects.all():
            city_point = city.location  # Use the 'location' field
            distance = self.calculate_distance(given_point, city_point)
            if distance < min_distance:
                min_distance = distance
                nearest_city = city

        if nearest_city:
            self.stdout.write(self.style.SUCCESS(f"Nearest city: {nearest_city.name} (Distance: {min_distance:.2f} km)"))
        else:
            self.stdout.write(self.style.ERROR("No city found"))