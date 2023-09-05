from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from trade.models import UserInformation, Post, Image

class UserInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInformation
        fields = "__all__"
        read_only_fields = ['id', 'user']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password':{'write_only':True, 'required':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    # images = ImageSerializer(many=True)
    # image_urls = serializers.HyperlinkedRelatedField()
    images = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['id', 'user']
