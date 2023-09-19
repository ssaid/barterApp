from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from django.conf import settings


def index(request):
    return HttpResponse("Hello, world. You're at the barter project, trade index v:4.0.")

def login_view(request):
    client_url = settings.CLIENT_URL
    return redirect(f"{client_url}/login")