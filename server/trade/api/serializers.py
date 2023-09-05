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

    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Image
        fields = ['image', 'post']


class PostSerializer(serializers.ModelSerializer):

    images = serializers.StringRelatedField(many=True, read_only=True)
    # categories = serializers.StringRelatedField(many=True)

    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        post = Post.objects.create(**validated_data)
        post.categories.set(categories_data)
        post.save()
        return post

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['id', 'user']
