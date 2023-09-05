from django.urls import path, include, re_path
from rest_framework import routers

from .views import (
    UserViewSet,
    UserInformationDetailView,
    MyPostViewSet,
)
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve
router = routers.SimpleRouter()
router.register(r'posts', MyPostViewSet)
urlpatterns = [
    path('users/info/', UserInformationDetailView.as_view(), name='user-info'),
    # path('posts/my/', MyPostViewSet.as_view(), name='post-list'),
    # path('posts/my/<int:id>/', MyPostViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='post-detail'),
] + router.urls