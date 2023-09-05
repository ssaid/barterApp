from django.urls import path, include, re_path
from rest_framework import routers

from .views import (
    ImageUploadView,
    UserInformationDetailView,
    MyPostViewSet,
    CountryViewSet,
    RegionViewSet,
    ContactMethodViewSet,
    LocationInfoView,
)
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve

router = routers.SimpleRouter()
router.register(r'posts', MyPostViewSet)
router.register(r'countries', CountryViewSet)
router.register(r'regions', RegionViewSet)
router.register(r'contactmethods', ContactMethodViewSet)

urlpatterns = [
    path('users/info/', UserInformationDetailView.as_view(), name='user-info'),
    path('images/', ImageUploadView.as_view(), name='image-upload'),
    path('geo/localize/', LocationInfoView.as_view(), name='location-info'),
    # path('posts/my/<int:id>/', MyPostViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='post-detail'),
] + router.urls
