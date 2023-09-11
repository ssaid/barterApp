from django.core.management.base import BaseCommand
from trade.models import Post

# USAGE: python manage.py get_post 3

class Command(BaseCommand):
    help = 'Duplicates a post for testing usages...'

    def add_arguments(self, parser):
        parser.add_argument('qty', type=int)

    def handle(self, *args, **options):
        qty = options['qty']
        Posts = Post.objects.all()
        for post in Posts:
            original_post_title = post.title
            original_post_description = post.description 
            original_post_images = post.images.all()
            for i in range(qty):
                post.pk = None
                post.title = f"{original_post_title} - {i}"
                post.description = f"{original_post_description} - {i}"
                post.save()
                for image in original_post_images.all():
                    image.pk = None
                    image.post = post
                    image.save()