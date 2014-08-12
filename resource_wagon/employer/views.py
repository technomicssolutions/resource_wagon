
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
from models import CompanyProfile,Recruiter,Job

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

class SaveEmployer(View):
    
    
    def post(self, request, *args, **kwargs):
        recruiter_details = ast.literal_eval(request.POST['recruiter_details'])
        status = 200
        if recruiter_details['id'] !=0 :
            recruiter = Recruiter.objects.get(id=recruiter_details['id'])
            user = recruiter.user
            
        else:           
            try:
                user = User.objects.get(username=recruiter_details['email'])
                res = {
                    'result': 'error',
                    'message': 'Email already exists',
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=status, mimetype='application/json')
            except:
                user = User.objects.create(username=recruiter_details['email'])
                user.set_password(recruiter_details['password'])
                user.email = recruiter_details['email']
                user.save()
                recruiter = Recruiter.objects.create(user=user)
        recruiter.country = recruiter_details['country']
        recruiter.city = recruiter_details['city']
        recruiter.mobile = int(recruiter_details['mobile'])
        if recruiter_details['phone']:
            recruiter.land_num = int(recruiter_details['phone'])
        if recruiter.company:
            company = recruiter.company
        else:
            company = CompanyProfile()
        
        company.company_name = recruiter_details['name']
        company.industry_type = recruiter_details['industry']
        company.description = recruiter_details['description']
        if request.FILES.get('profile_doc', ''):
            company_profile = request.FILES['profile_doc']       
            company.company_profile = company_profile
        company.save()
        recruiter.company = company
        recruiter.save()
        user.save()
        if request.user.is_authenticated() == False:
            user = authenticate(username=recruiter_details['email'], password=recruiter_details['password'])
            if user and user.is_active:
                login(request, user)
                message = 'Logged in'
                is_logged_in = True
            else:
                message = 'Not logged in' 

        res = {
            'result': 'ok',
            'recruiter_id': recruiter.id,
        }
        response = simplejson.dumps(res)

        return HttpResponse(response, status=status, mimetype='application/json')

class EmployerView(View):

    def get(self, request, *args, **kwargs):
        employer_id = request.user.recruiter_set.all()[0].id
        return render(request,'employer.html', {'employer_id':employer_id,})   


class EditEmployer(View):
    def get(self,request,*args,**kwargs):
        recruiter_id = kwargs['employer_id']
        recruiter = Recruiter.objects.get(id=recruiter_id)
        print recruiter_id
        user = recruiter.user
        company = recruiter.company
        context = {
            'recruiter_id' :recruiter_id,
            'recruiter':recruiter,
            'user':user,
            'company':company
        }
        ctx_employer_data = []
        if request.is_ajax():
            ctx_employer_data.append ({
                'id' : recruiter_id,
                'user': recruiter.user.username,
                'email':recruiter.user.email if recruiter.user.email else '',
                'country':recruiter.country if recruiter.country else '',
                'city': recruiter.city if recruiter.city else '',
                'mobile': recruiter.mobile if recruiter.mobile else '',
                'phone':recruiter.land_num if recruiter.land_num else '',
                'name': recruiter.company.company_name if recruiter.company.company_name else '',
                'industry': recruiter.company.industry_type if recruiter.company.industry_type else '',
                'description': recruiter.company.description if recruiter.company.description else '',
                'company_profile': recruiter.company.company_profile.name if recruiter.company else '',
            })
            res ={
                'recruiter': ctx_employer_data,
            }
            response = simplejson.dumps(res)    
            return HttpResponse(response, status=200, mimetype='application/json')
        return render(request, 'employer.html', context)


class PostJobsView(View):
    def get(self,request,*args,**kwargs):
        recruiter = Recruiter.objects.get(user=request.user)
        
        context = {
            'company_name': recruiter.company.company_name,
        }
        return render(request, 'job_post.html', context)
    def post(self, request, *args, **kwargs):

        current_user = request.user
        recruiter = Recruiter.objects.get(user = current_user)
        jobPosting = Job.objects.create(recruiter = recruiter)
        post_data = request.POST
        jobpost = ast.literal_eval(post_data['jobpost'])
        
        
        company, created = CompanyProfile.objects.get_or_create(company_name = jobpost['company'])
        jobPosting.job_title = jobpost['title']
        jobPosting.ref_code = jobpost['code']
        jobPosting.company = company
        jobPosting.summary = jobpost['summary']
        document = request.FILES.get('product_pdf', '')
        if document:
            jobPosting.document = document
        if jobpost['salary']:
            jobPosting.salary = jobpost['salary']
        jobPosting.currency = jobpost['currency']    
        jobPosting.skills = jobpost['skills']
        jobPosting.industry = jobpost['industry']
        jobPosting.job_location = jobpost['location']
        jobPosting.education_req = jobpost['requirement']
        jobPosting.function = jobpost['function']
        jobPosting.specialization = jobpost['specialisation']
        jobPosting.nationality = jobpost['nationality']

        if jobpost['last_date']:
            jobPosting.last_date  = datetime.strptime(jobpost['last_date'], '%d/%m/%Y')
        jobPosting.name = jobpost['name']
        jobPosting.phone = jobpost['phone']
        jobPosting.mail_id = jobpost['email']
        jobPosting.description = jobpost['profile']
        if jobpost['post_date']:
            jobPosting.posting_date = datetime.strptime(jobpost['post_date'], '%d/%m/%Y')
        jobPosting.exp_req_min = jobpost['min']
        jobPosting.exp_req_max = jobpost['max']
        jobPosting.save()

        res = {
            'id' : jobPosting.id,
            'message':'data posted on our server'
        } 
        response = simplejson.dumps(res)
        status_code = 200
        return HttpResponse(response, status = status_code, mimetype="application/json")

class PostedJobsView(View):
     def get(self, request,*args, **kwargs):
        jobs = []
        current_user = request.user
        recruiter = Recruiter.objects.get(user = current_user)
        jobs = Job.objects.filter(recruiter=recruiter)
        context = {
          'jobs': jobs,
        }
        return render(request, 'posted_jobs.html', context)

class DeleteJob(View):

    def get(self, request, *args, **kwargs):

        try:
            job = Job.objects.get(id = kwargs['job_id'])
            job.delete()
            current_user = request.user
            recruiter = Recruiter.objects.get(user = current_user)
            jobs = Job.objects.filter(recruiter=recruiter)
        except Exception as ex:
            print str(ex)
            jobs = []
        context = {
          'jobs': jobs,
          'message': 'Deleted',
        }
        return HttpResponseRedirect(reverse('posted_jobs'))

class PublishJob(View):

    def get(self, request, *args, **kwargs):

        try:
            job = Job.objects.get(id = kwargs['job_id'])
            job.is_publish = True
            job.save()
            current_user = request.user
            recruiter = Recruiter.objects.get(user = current_user)
            jobs = Job.objects.filter(recruiter=request.user)
        except Exception as ex:
            print str(ex)
            jobs = []
        context = {
          'jobs': jobs,
          'message': 'Published', 
        }

        return HttpResponseRedirect(reverse('posted_jobs'))

class EditPostJobsView(View):

    def get(self, request, *args, **kwargs):
        job_id = kwargs['job_id']

        context = {
            'job_id':job_id,
        }
        return render(request, 'job_post.html', context)

    def post(self, request, *args, **kwargs):

        jobPosting =Job.objects.get(id= kwargs['job_id'])
        post_data = request.POST

        jobpost = ast.literal_eval(post_data['jobpost'])
        jobPosting.job_title = jobpost['title']
        jobPosting.ref_code = jobpost['code']
        company, created = CompanyProfile.objects.get_or_create(company_name = jobpost['company'])
        jobPosting.company = company
        jobPosting.summary = jobpost['summary']

        document = request.FILES.get('product_pdf', '')
        if document:
            jobPosting.document = document
        if jobpost['salary']:
            jobPosting.salary = jobpost['salary']
        jobPosting.currency = jobpost['currency'] 
        jobPosting.skills = jobpost['skills']
        jobPosting.industry = jobpost['industry']
        jobPosting.job_location = jobpost['location']
        jobPosting.function = jobpost['function']
        jobPosting.education_req = jobpost['requirement']
        jobPosting.specialization = jobpost['specialisation']
        jobPosting.nationality = jobpost['nationality']
        jobPosting.name = jobpost['name']
        jobPosting.phone = jobpost['phone']
        jobPosting.mail_id = jobpost['email']
        jobPosting.description = jobpost['profile']        
        jobPosting.exp_req_min = jobpost['min']
        jobPosting.exp_req_max = jobpost['max']
        if jobpost['last_date']:
            jobPosting.last_date  = datetime.strptime(jobpost['last_date'], '%d-%m-%Y')
            print jobPosting.last_date
        if jobpost['post_date']:
            jobPosting.posting_date = datetime.strptime(jobpost['post_date'], '%d-%m-%Y')
        jobPosting.save()
        context = {}
        res = {
            'id' : jobPosting.id,
        } 
        response = simplejson.dumps(res)
        status_code = 200
        return HttpResponse(response, status = status_code, mimetype="application/json")

