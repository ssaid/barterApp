from django.urls import path, include, re_path

from .views import (
    UserViewSet,
)


urlpatterns = [
    path('users/', UserViewSet.as_view({'post': 'create'}), name='user_create'),
]

