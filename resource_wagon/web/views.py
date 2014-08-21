
import simplejson
import re
import ast
from datetime import datetime
from django.conf import settings
from django.shortcuts import render
from django.views.generic.base import View
from django.core.mail import send_mail, BadHeaderError, EmailMessage, EmailMultiAlternatives, mail_admins
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from models import RequestSend, Reply, Job
from django.contrib.sites.models import Site
from django.template.loader import render_to_string
from random import randint

class Home(View):
    
    def get(self, request, *args, **kwargs):
        jobs = Job.objects.all().order_by('-posting_date')[:10]
        context = {
            'jobs': jobs,
        }
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
        return HttpResponseRedirect(reverse('home'))

class Logout(View):

    def get(self, request, *args, **kwargs):

        logout(request)
        return HttpResponseRedirect(reverse('home'))

class ForgotPassword(View):

    def get(self, request, *args, **kwargs):

        return render(request, 'forgot_password.html', {})

    def post(self, request, *args, **kwargs):

        user = User.objects.filter(email = request.POST['email_id'])
        if user.exists():
            user = user[0]
            print randint(1000,9999)
            randum_num = randint(1000,9999)
            user.set_password(str(randum_num))
            user.save()
            subject = 'Reset Your Password'
            text_content = 'Your New Password is'+ str(randum_num)
            from_email = settings.DEFAULT_FROM_EMAIL
            to = []
            if subject  and from_email:
                
                to.append(user.email)
                for i in range(len(to)):
                    msg = EmailMultiAlternatives(subject, text_content, from_email, [to[i]])
                    msg.send()
                    context = {
                        'message': 'An email has been sent to your registered email account. Please Check  your new password and login.',
                    }
                    return render(request, 'login.html', context)
                    
        else:
            context = {
                'message': 'You have no matching profiles with this email id',
            }
            return render(request, 'forgot_password.html', context)


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

class RequestView(View):

    def get(self, request, *args, **kwargs):

        requests = RequestSend.objects.all()
        context = {
            'requests':requests,
        }
        return render(request, 'requests.html', context)

class DeleteRequest(View):

    def get(self, request, *args, **kwargs):

        request_id = kwargs['request_id']
        request = RequestSend.objects.get(id=request_id)
        request.is_delete =True
        request.save()

        return render(request, 'requests.html', {})

class ReplyEmployer(View):

    def post(self, request, *args, **kwargs):

        request_id = kwargs['request_id']
        request = RequestSend.objects.get(id=request_id)
        email_to = request.recruiter.user.email
        subject = " Contact details "
        message = " contact details of " + request.jobseeker.user.first_name + request.jobseeker.user.last_name + "Email : " + str(request.jobseeker.user.email) + "Mobile:" + str(request.jobseeker.mobile) + "Land Line:" + str(request.jobseeker.land_num)
        from_email = settings.DEFAULT_FROM_EMAIL 
        reply = Reply()
        reply.request = request
        reply.request.is_replied = True
        request.save()
        reply.save()
        send_mail(subject, message, from_email,[email_to])
        return HttpResponseRedirect(reverse('request')) 


class Aboutus(View):

    def post(self, request, *args, **kwargs):
            return render(request, 'aboutus.html', {})

