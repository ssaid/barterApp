# Generated by Django 4.2.5 on 2023-09-06 21:40

from django.db import migrations
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('trade', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, null=True, upload_to='categories'),
        ),
        migrations.AlterField(
            model_name='contactmethod',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, null=True, upload_to='contact_methods'),
        ),
        migrations.AlterField(
            model_name='image',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, null=True, upload_to='posts'),
        ),
        migrations.AlterField(
            model_name='userinformation',
            name='avatar',
            field=versatileimagefield.fields.VersatileImageField(blank=True, null=True, upload_to='avatars/'),
        ),
    ]
