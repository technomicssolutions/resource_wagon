
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
        # try:
        #     if user.recruiter_set.all():
                
        #         return HttpResponseRedirect(reverse('employer_profile'))
        #     elif user.jobseeker_set.all():
                
        #         return HttpResponseRedirect(reverse('jobseeker_details'))
        # except :
        #     return HttpResponseRedirect(reverse('home'))
        return HttpResponseRedirect(reverse('home'))

class Logout(View):

    def get(self, request, *args, **kwargs):

        logout(request)
        return HttpResponseRedirect(reverse('home'))

class ResetPassword(View):

    def get(self, request, *args, **kwargs):

        user = User.objects.get(id=kwargs['user_id'])
        context = {
            'user_id': user.id
        }
        return render(request, 'reset_password.html', context)

    def post(self, request, *args, **kwargs):

        context = {}
        user = User.objects.get(id=kwargs['user_id'])
        if request.POST['password'] != request.POST['confirm_password']:
            context = {
                'user_id': user.id,
                'message': 'Password is not matched with Confirm Password',
            }
            return render(request, 'reset_password.html', context)
        if len(request.POST['password']) > 0 and not request.POST['password'].isspace():
            user.set_password(request.POST['password'])
        user.save()
        if user == request.user:
            logout(request)
            return HttpResponseRedirect(reverse('home'))  
        elif request.user.is_superuser:
            return HttpResponseRedirect(reverse('home'))