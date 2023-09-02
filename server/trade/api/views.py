from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, UserInformationSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

from trade.models import UserInformation


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