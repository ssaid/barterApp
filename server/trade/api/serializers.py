from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from trade.models import UserInformation, Post, Image, ContactMethod, Category, Like
from cities.models import Country, Region
from versatileimagefield.serializers import VersatileImageFieldSerializer


class CategorySerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(sizes=[
        ('full_size', 'url'),
        ('thumbnail', 'thumbnail__200x200'),
        ('medium_square_crop', 'crop__150x150'),
        ('small_square_crop', 'crop__100x100'),
    ])
    class Meta:
        model = Category
        fields = "__all__"

    def validate(self, data):
        print(data)
        return data

class LocationSerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

# Provinces
class RegionSerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    class Meta:
        model = Region
        fields = ["id","name"]

class ContactMethodSerializer(serializers.ModelSerializer):   
    class Meta:
        model = ContactMethod
        fields = "__all__"

class CountrySerializer(serializers.ModelSerializer):
    id = serializers.CharField()

    class Meta:
        model = Country
        fields = ["id", "name","code"]

class UserInformationSerializer(serializers.ModelSerializer):
    avatar = VersatileImageFieldSerializer(sizes=[
        ('full_size', 'url'),
        ('thumbnail', 'thumbnail__100x100'),
        ('medium_square_crop', 'crop__400x400'),
        ('small_square_crop', 'crop__50x50'),
    ])
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
    image = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('thumbnail', 'thumbnail__350x350'),
            ('large_square_crop', 'crop__350x350'),
            ('medium_square_crop', 'crop__125x125'),
            ('small_square_crop', 'crop__100x100'),
        ]
    )
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Image
        fields = ['image', 'is_main', 'post']


class PostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    # images = serializers.StringRelatedField(many=True, read_only=True)
    categories = CategorySerializer(many=True)
    is_liked = serializers.SerializerMethodField()

    def get_is_liked(self, obj):
        if not self.context['request'].user.is_authenticated:
            return False
        return Like.objects.filter(user=self.context['request'].user, post=obj).exists()

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['id', 'user']

class PostSerializerCustom(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    # images = serializers.StringRelatedField(many=True, read_only=True)
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['id', 'user']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'like_count']
        read_only_fields = ['id', 'like_count']
