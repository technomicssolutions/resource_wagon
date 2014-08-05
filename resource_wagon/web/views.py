
import simplejson
import re
import ast
from datetime import datetime

from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

class Home(View):
    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, 'home.html', context)

class Login(View):
    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, 'login.html', context)

    def post(self, request, *args, **kwargs):

        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user and user.is_active:
            login(request, user)
        else:
            context = {
                'message' : 'Username or password is incorrect'
            }
            return render(request, 'login.html', context)
        try:
            if user.recruiter_set.all():
                
                return HttpResponseRedirect(reverse('employer_profile'))
            elif user.jobseeker_set.all():
                
                return HttpResponseRedirect(reverse('jobseeker_details'))
        except :
            return HttpResponseRedirect(reverse('home'))

class Logout(View):

    def get(self, request, *args, **kwargs):

        logout(request)
        return HttpResponseRedirect(reverse('home'))