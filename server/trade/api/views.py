from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, DjangoModelPermissions
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, UserInformationSerializer, PostSerializer, ImageSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

from trade.models import UserInformation, Post


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        instance = serializer.save()
        UserInformation.objects.create(user=instance)
        instance.save()


class UserInformationDetailView(generics.RetrieveUpdateAPIView):
    queryset = UserInformation.objects.all()
    serializer_class = UserInformationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserInformation.objects.get(user=self.request.user)


class ImageUploadView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

class MyPostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.prefetch_related('images', 'categories').all()
    serializer_class = PostSerializer
    permission_classes = [ DjangoModelPermissions | IsAuthenticated ]


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
