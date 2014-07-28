
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

class EmployerRegistration(View):

    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, 'employer_registration.html', context)

    def post(self, request, *args, **kwargs):

        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user and user.is_active:
            login(request, user)
        else:
            context = {
                'message' : 'Username or password is incorrect'
            }
            return render(request, 'employer_registration.html', context)
        return HttpResponseRedirect(reverse('home'))