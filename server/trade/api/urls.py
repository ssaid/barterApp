from django.urls import path, include, re_path

from .views import (
    UserViewSet,
    UserInformationDetailView,
)


urlpatterns = [
    path('users/info/', UserInformationDetailView.as_view(), name='user-info'),
]

