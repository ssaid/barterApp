from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# class RegistrationView(APIView):
#     """
#     View for user management.
#     """

#     @swagger_auto_schema(
#         request_body=UserSerializer,
#         responses={
#             201: openapi.Response(
#                 description="User created successfully",
#                 schema=openapi.Schema(
#                     type=openapi.TYPE_OBJECT,
#                     properties={
#                         'id': openapi.Schema(type=openapi.TYPE_INTEGER),
#                         'username': openapi.Schema(type=openapi.TYPE_STRING),
#                         'email': openapi.Schema(type=openapi.TYPE_STRING),
#                         'password': openapi.Schema(type=openapi.TYPE_STRING),
#                     },
#                     required=['username', 'email', 'password']
#                 )
#             ),
#             400: "Bad Request"
#         }
#     )
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
