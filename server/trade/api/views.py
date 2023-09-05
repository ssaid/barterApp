from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
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


class MyPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    
    # def get_queryset(self):
    #     return Post.objects.filter(user=self.request.user)
    
    # Images
    def list_images(self, request, *args, **kwargs):
        post = self.get_object()
        images = post.images.all()
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)

    def create_image(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def partial_update_image(self, request, *args, **kwargs):
        post = self.get_object()
        image = post.images.get(id=kwargs['image_pk'])
        serializer = ImageSerializer(image, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy_image(self, request, *args, **kwargs):
        post = self.get_object()
        try:
            image = post.images.get(id=kwargs['image_pk'])
            image.delete()
            return Response(status=204)
        except Image.DoesNotExist:
            return Response(status=404)