from django.urls import path, include, re_path
from rest_framework import routers

from .views import (
    ImageUploadView,
    UserInformationDetailView,
    MyPostViewSet,
    CountryView,
    RegionView,
    ContactMethodView,
    LocationInfoView,
    CategoryView,
    AllPostView,
)
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve

router = routers.SimpleRouter()
router.register(r'myposts', MyPostViewSet)
router.register(r'posts', AllPostView)

urlpatterns = [
    path('users/info/', UserInformationDetailView.as_view(), name='user-info'),
    path('images/', ImageUploadView.as_view(), name='image-upload'),
    path('geo/localize/', LocationInfoView.as_view(), name='location-info'),
    path('countries/', CountryView.as_view(), name='countries-list'),
    path('regions/', RegionView.as_view(), name='regions-list'),
    path('contactmethods/', ContactMethodView.as_view(), name='contactmethods-list'),
    path('categories/', CategoryView.as_view(), name='categories-list'),
    # path('posts/my/<int:id>/', MyPostViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='post-detail'),
] + router.urls