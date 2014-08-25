
import simplejson
import ast
from random import randint


from django.conf import settings
from django.shortcuts import render
from django.views.generic.base import View
from django.core.mail import send_mail, EmailMultiAlternatives
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from models import RequestSend, Reply, Job
from employer.models import CompanyProfile, Recruiter

class Home(View):
    
    def get(self, request, *args, **kwargs):
        jobs = Job.objects.all().order_by('-posting_date')[:10]
        context = {
            'jobs': jobs,
        }
        return render(request, 'home.html', context)

class Dashboard(View):
    
    def get(self, request, *args, **kwargs):

        return render(request, 'dashboard.html', {})

class Login(View):
    
    # def get(self, request, *args, **kwargs):
    #     context = {}
    #     return render(request, 'login.html', context)

    def post(self, request, *args, **kwargs):

        login_details  = ast.literal_eval(request.POST['login_details'])
        user = User.objects.get(email=login_details['username'])
        if user:
            user = authenticate(username=user.username, password=login_details['password'])

            status = 200
            if user.is_active:
                login(request, user)
            else:
                res = {
                    'result': 'error',
                    'message': 'Username or password is incorrect',
                }
        else:
            res = {
                    'result': 'error',
                    'message': 'Username or password is incorrect',
                }
        
        if user.recruiter_set.all():
            res = {
                    'result': 'recruiter',

                }            
        elif user.jobseeker_set.all():
            res = {
                    'result': 'jobseeker',

                }
             
        elif user.is_superuser :
            res = {
                    'result': 'admin',

                }
        if request.is_ajax():
            response = simplejson.dumps(res)
            return HttpResponse(response, status=status, mimetype='application/json')
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

    def get(self, request, *args, **kwargs):
            return render(request, 'aboutus.html', {})

class Companies(View):
    def get(self, request, *args, **kwargs):
        companies = CompanyProfile.objects.all()
        paginator = Paginator(companies, 20) # Show 25 contacts per page

        page = request.GET.get('page')
        try:
            companies = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            companies = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            companies = paginator.page(paginator.num_pages)
        return render(request, 'companies.html', {
            'companies': companies
        })
class Company(View):
    def get(self, request, *args, **kwargs):
        company_name = kwargs['company_name']
        company = CompanyProfile.objects.get(company_name=company_name)
        print company
        print company.industry_type
        return render(request, 'company.html', {
            'company': company
        })
class PremiumEmployer(View):
    def post(self, request, *args, **kwargs):
        
        premium_employer = ast.literal_eval(request.POST['premium_employer'])
        status = 200
        print premium_employer
        recruiter = Recruiter.objects.get(id=premium_employer['id'])
        recruiter.company.is_premium_company = premium_employer['premium']
        print recruiter.company.is_premium_company
        recruiter.company.save()
        res = {
                    'result': 'ok',

                }
        response = simplejson.dumps(res)
        return HttpResponse(response, status=status, mimetype='application/json')
