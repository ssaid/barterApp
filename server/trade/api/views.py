from rest_framework import viewsets, permissions, generics, status, pagination
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from .serializers import AvatarSerializer, UserSerializer, UserInformationSerializer, PostSerializer, ImageSerializer, CountrySerializer, ContactMethodSerializer, RegionSerializer, LocationSerializer, CategorySerializer, PostSerializerCustom
import django_filters.rest_framework
import django_filters
from django_filters import rest_framework as filters
from django.db import models
from verify_email.email_handler import _VerifyEmail
from django.utils.text import slugify 

from django.contrib.auth import get_user_model
User = get_user_model()

from trade.models import UserInformation, Post, Country, ContactMethod, Category, Like
from cities.models import Region
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class LocationInfoView(APIView):
    serializer_class = LocationSerializer
    queryset = UserInformation.objects.all()


    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'latitude',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_NUMBER,
                description='Latitude of the location',
                required=True,
            ),
            openapi.Parameter(
                'longitude',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_NUMBER,
                description='Longitude of the location',
                required=True,
            ),
        ],
        responses={
            status.HTTP_200_OK: openapi.Response('City and Region information', LocationSerializer),
            status.HTTP_400_BAD_REQUEST: 'Invalid input',
        },
    )
    def get(self, request):
        serializer = self.serializer_class(data=request.query_params)

        if serializer.is_valid():
            latitude = serializer.validated_data['latitude']
            longitude = serializer.validated_data['longitude']

            data = UserInformation.get_coord_info(latitude, longitude)
            if not data:
                return Response({'error': 'No city found'}, status=status.HTTP_404_NOT_FOUND)

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegionView(generics.ListAPIView):
    queryset = Region.objects.filter(country__name='Argentina')
    serializer_class = RegionSerializer


class ContactMethodView(generics.ListAPIView):
    queryset = ContactMethod.objects.all()
    serializer_class = ContactMethodSerializer


class CountryView(generics.ListAPIView):
    queryset = Country.objects.filter(name__iexact='argentina')
    serializer_class = CountrySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    def perform_create(self, serializer):
        instance = serializer.save()
        UserInformation.objects.create(user=instance)
        # Send email for verification
        _VerifyEmail().send_verification_link(self.request, inactive_user=instance)
        instance.save()


class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class UserInformationDetailView(generics.RetrieveUpdateAPIView):
    queryset = UserInformation.objects.all()
    serializer_class = UserInformationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return UserInformation.objects.get(user=self.request.user)


class ImageUploadView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

class MyPostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.prefetch_related('images', 'categories').all()
    serializer_class = PostSerializer
    permission_classes = [ permissions.IsAuthenticated ]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user).prefetch_related('images', 'categories').all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve', 'delete'):
            return PostSerializer
        return PostSerializerCustom

class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = []

    category = filters.CharFilter(field_name='categories__slug', lookup_expr='exact', label='Category slug')
    search = filters.CharFilter(method='search_filter', label='By name & description')

    def search_filter(self, queryset, name, value):
        return queryset.filter(models.Q(title__icontains=value) | models.Q(description__icontains=value))

class AllPostView(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.prefetch_related('images', 'categories').all()
    serializer_class = PostSerializer
    permission_classes = [ permissions.AllowAny ]
    pagination_class = pagination.LimitOffsetPagination
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = PostFilter
    lookup_field = 'slug'

    def get_queryset(self):
        return Post.objects.prefetch_related('images', 'categories').all()

    def get_permissions(self):
        # If accessing the like or unlike actions, require authentication
        if self.action in ['like', 'unlike']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['POST'])
    def like(self, request, pk=None):
        post = self.get_object()
        
        # Check if user already liked the post
        like = Like.objects.filter(post=post, user=request.user)
        if like.exists():
            return Response({'likes': 'You have already liked this post.'}, status=400)
        
        # Create like object
        Like.objects.create(post=post, user=request.user)
        return Response({'likes': Like.objects.filter(post=post).count()}, status=200)

    @action(detail=True, methods=['POST'])
    def unlike(self, request, pk=None):
        post = self.get_object()

        # Check if user liked the post
        like = Like.objects.filter(post=post, user=request.user)
        if not like.exists():
            return Response({'detail': 'You have not liked this post yet.'}, status=400)

        # Remove like
        [l.delete() for l in like]
        return Response({'likes': Like.objects.filter(post=post).count()}, status=200)


class FavouritesView(generics.ListAPIView):

    queryset = Post.objects.prefetch_related('images', 'categories').all()
    serializer_class = PostSerializer
    permission_classes = [ permissions.IsAuthenticated ]

    def get_queryset(self):
        return Post.objects.filter(likes__user=self.request.user).prefetch_related('images', 'categories').all()


class UploadAvatarView(generics.UpdateAPIView):

    queryset = UserInformation.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = AvatarSerializer

    def get_object(self):
        return UserInformation.objects.get(user=self.request.user)
    

