from django.contrib import admin
from django.apps import apps

# from book.models import Book
# class BookAdmin(admin.ModelAdmin):
#     list_display = ('name', 'author')
# # model registered with custom admin
# admin.site.register(Book, BookAdmin)
# all other models

models = apps.get_models()
for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass