
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
from django.template.loader import render_to_string

from models import RequestSend, Reply, Job
from employer.models import CompanyProfile, Recruiter
from jobseeker.models import Jobseeker
from web.models import ContactUs, CVRequest

class Home(View):
    
    def get(self, request, *args, **kwargs):
        jobs = Job.objects.filter(is_publish=True).order_by('-posting_date')[:10]
        recruiters = Recruiter.objects.filter(company__is_premium_company=True)
        context = {
            'jobs': jobs,
            'recruiters': recruiters,
        }
        return render(request, 'home.html', context)


class TermsAndConditions(View):
    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, 'terms_conditions.html', context)

class Dashboard(View):
    
    def get(self, request, *args, **kwargs):

        return render(request, 'dashboard.html', {})

class Login(View):

    def get(self, request, *args, **kwargs):

        return render(request, 'home.html', {
            'login': True
        })
    
    def post(self, request, *args, **kwargs):

        login_details  = ast.literal_eval(request.POST['login_details'])
        try:
            user = User.objects.get(email=login_details['username'])
        except:
            try:
                user = User.objects.get(username=login_details['username'])
            except:
                res = {
                    'result': 'error',
                    'message': 'Email or password is incorrect',
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=200, mimetype='application/json')
        if user:
            user = authenticate(username=user.username, password=login_details['password'])
            status = 200
            if user:
                login(request, user)
                if user.recruiter_set.all():
                    user_type = 'recruiter',
                elif user.jobseeker_set.all():
                    user_type = 'jobseeker',                
                elif user.is_superuser :
                    user_type = 'admin',   
                res = {
                    'result': user_type,
                }
            else:
                res = {
                    'result': 'error',
                    'message': 'Email or password is incorrect',
                }
        else:
            res = {
                'result': 'error',
                'message': 'Email or password is incorrect',
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
            randum_num = randint(1000,9999)
            user.set_password(str(randum_num))
            user.save()
            subject = 'Reset Your Password'
            text_content = 'Your New Password is'+ str(randum_num)
            from_email = settings.DEFAULT_FROM_EMAIL
            to = []
            if subject and from_email:                
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

        context = {
            'user_id': request.user.id
        }
        return render(request, 'reset_password.html', context)

    def post(self, request, *args, **kwargs):

        context = {}
        user = request.user
        if request.POST['password'] == '':
            context = {
                'user_id': user.id,
                'message': 'Please provide a password',
            }
            return render(request, 'reset_password.html', context)
        if request.POST['password'] != request.POST['confirm_password']:
            context = {
                'user_id': user.id,
                'message': 'Password is not matched with Confirm Password',
            }
            return render(request, 'reset_password.html', context)
        if len(request.POST['password']) > 0 and not request.POST['password'].isspace():
            user.set_password(request.POST['password'])
        user.save()
        logout(request)
        return HttpResponseRedirect(reverse('home'))  
        

class RequestView(View):

    def get(self, request, *args, **kwargs):
        re = RequestSend.objects.filter(is_new=True).update(is_new=False)
        requests = RequestSend.objects.all().order_by('-id')
        # context = {
        #     'requests':requests,
        # }
        # return render(request, 'requests.html', context)
        paginator = Paginator(requests, 20) 

        page = request.GET.get('page')
        try:
            requests = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            requests = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            requests = paginator.page(paginator.num_pages)
        return render(request, 'requests.html', {
            'requests': requests
        })
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

class MissionStatement(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'mission_statement.html', {})

class ResourcesWagon(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'resources_wagon.html', {})

class WagonDrivers(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'wagon_drivers.html', {})
			
class CandidatePreparation(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'candidate_preparation.html', {})

class RecruitmentDivisions(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'recruitment_divisions.html', {})

class CompetencyAnalysis(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'competency_analysis.html', {})
			
class WagonDrivers(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'wagon_drivers.html', {})

class Contact(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'contact.html', {})

    def post(self, request, *args, **kwargs):

        sender_details = ast.literal_eval(request.POST['sender_details'])
        users = User.objects.filter(is_superuser=True)
        contact  = ContactUs()
        contact.name = sender_details['name']
        contact.mail = sender_details['mail']
        contact.message = sender_details['message']
        contact.source = sender_details['source']
        contact.save()
        for user in users:
            email_to = user.email
            subject = "Enquiry"
            text_content = 'This is Important'
            from_email = settings.DEFAULT_FROM_EMAIL 
            ctx = {
                'contact': contact,
                'user': user,
            }
            html_content = render_to_string('email/contact_us.html', ctx)
            msg = EmailMultiAlternatives(subject, html_content, from_email,[email_to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        res = {
            'result': 'ok',
            'message': 'Your message has been successfully sent. We will contact you very soon!',
        }
        response = simplejson.dumps(res)
        return HttpResponse(response, status=200, mimetype='application/json')


class RequestCV(View):

    def get(self, request, *args, **kwargs):
            return render(request, 'cv_request.html', {})

    def post(self, request, *args, **kwargs):

        sender_details = ast.literal_eval(request.POST['sender_details'])
        users = User.objects.filter(is_superuser=True)
        cvrequest  = CVRequest()
        cvrequest.name = sender_details['name']
        cvrequest.mail = sender_details['mail']
        cvrequest.mobile = sender_details['mobile']
        cvrequest.save()
        for user in users:
            email_to = user.email
            subject = "Request For CV"
            text_content = 'This is Important'
            from_email = settings.DEFAULT_FROM_EMAIL 
            ctx = {
                'cvrequest': cvrequest,
                'user': user,
            }
            html_content = render_to_string('email/cvrequest.html', ctx)
            msg = EmailMultiAlternatives(subject, html_content, from_email,[email_to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()

        res = {
            'result': 'ok',
            'message': 'Your message has been successfully sent. We will contact you very soon!',
        }
        response = simplejson.dumps(res)
        return HttpResponse(response, status=200, mimetype='application/json')


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
        company_id = kwargs['company_id']

        company = CompanyProfile.objects.get(id=company_id)
    
        return render(request, 'company.html', {
            'company': company
        })

class PremiumEmployer(View):
    
    def post(self, request, *args, **kwargs):
        
        premium_employer = ast.literal_eval(request.POST['premium_employer'])
        status = 200
        recruiter = Recruiter.objects.get(id=premium_employer['id'])
        if premium_employer['premium'] == "True":
            recruiter.company.is_premium_company = True
        else:
            recruiter.company.is_premium_company = False
        recruiter.company.save()
        res = {
                'result': 'ok',

                }
        response = simplejson.dumps(res)
        return HttpResponse(response, status=status, mimetype='application/json')

class DeleteEmployer(View):

     def get(self,request,*args,**kwargs):
        recruiter_id = kwargs['recruiter_id']
        recruiter = Recruiter.objects.get(id=recruiter_id)
        recruiter.delete()
        return HttpResponseRedirect(reverse('employer_profile'))

class DeleteJobseeker(View):

     def get(self,request,*args,**kwargs):
        jobseeker_id = kwargs['jobseeker_id']
        jobseeker = Jobseeker.objects.get(id=jobseeker_id)
        jobseeker.delete()
        return HttpResponseRedirect(reverse('jobseeker_details'))

