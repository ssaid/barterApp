from django.contrib.gis.db import models
from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point
from cities.models import Country
from django.contrib.auth.models import AbstractUser


# User = get_user_model()

class User(AbstractUser):
    username = models.CharField(max_length=255, unique=False, null=True, blank=True)
    email = models.EmailField(unique=True, null=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class ContactMethod(models.Model):
    name = models.CharField(max_length=20)
    image = models.ImageField(upload_to='contact_methods', blank=True, null=True)

    def __str__(self):
        return self.name


class UserInformation(models.Model):
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
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

class Contact(models.Model):
    description = models.CharField(max_length=200)
    contact_method = models.ForeignKey(ContactMethod, on_delete=models.CASCADE)
    user = models.ForeignKey(UserInformation, related_name='contacts' ,on_delete=models.CASCADE)

class Category(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    image = models.ImageField(upload_to='categories', blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    categories = models.ManyToManyField(Category, related_name='posts')
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    state = models.CharField(max_length=50, choices=[('draft', 'Inactiva'), ('active', 'Activa'), ('done', 'Finalizada')], default='draft')
    interactions = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts', blank=True, null=True)
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return self.image.url
