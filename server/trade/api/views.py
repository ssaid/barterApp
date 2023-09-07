from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, UserInformationSerializer, PostSerializer, ImageSerializer, CountrySerializer, ContactMethodSerializer, RegionSerializer, LocationSerializer, CategorySerializer

from django.contrib.auth import get_user_model
User = get_user_model()

from trade.models import UserInformation, Post, Country, ContactMethod, Category
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


    def create(self, request, *args, **kwargs):
        print("""




        """)

        print(request.data)

        categories = Category.objects.filter(id__in=request.data['categories'])

        print(categories)


        request.data['categories'] = categories

        return super().create(request, *args, **kwargs)


    def get_queryset(self):
        return Post.objects.filter(user=self.request.user).prefetch_related('images', 'categories').all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
