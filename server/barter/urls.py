"""
URL configuration for barter project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from trade.api.views import UserRegistrationView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
    openapi.Info(
      title="Trade API",
      default_version='v1',
      description="API For trading objects",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="ayuda@permut.ar"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)

urlpatterns = [
    # path('trade/api/', include(router.urls)),
    # path("trade/", include("trade.urls")),
    path('api/v1/', include('trade.api.urls')),
    path('', include('trade.urls')),
    path('admin/', admin.site.urls),
    path('api/v1/api-auth/', include('rest_framework.urls')),
    # JWT
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/auth/users/', UserRegistrationView.as_view(), name='user-registration'),
    re_path('api/v1/auth/', include('drf_social_oauth2.urls', namespace='drf')),
    # Swagger
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('verification/', include('verify_email.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
