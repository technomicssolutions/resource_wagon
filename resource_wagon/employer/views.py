
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
from models import CompanyProfile,Recruiter

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
        print recruiter_details
        print request.FILES
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
            except Exception as ex:
                user = User.objects.create(username=recruiter_details['email'])
                user.set_password(recruiter_details['password'])
                user.email = recruiter_details['email']
                user.save()
                recruiter = Recruiter.objects.create(user=user)
        recruiter.country = recruiter_details['country']
        recruiter.city = recruiter_details['city']
        recruiter.mobile = int(recruiter_details['mobile'])
        recruiter.land_num = int(recruiter_details['phone'])
        if recruiter.company:
            company = recruiter.company
        else:
            company = CompanyProfile()
        
        company.company_name = recruiter_details['name']
        company.industry_type = recruiter_details['industry']
        company.description = recruiter_details['description']
        company.company_profile = request.FILES['profile_doc']
        company.save()
        recruiter.company = company
        recruiter.save()
        user.save()
        
        res = {
            'result': 'ok',
            'recruiter_id': recruiter.id,
        }
        response = simplejson.dumps(res)

        return HttpResponse(response, status=status, mimetype='application/json')

class EmployerView(View):

    def get(self, request, *args, **kwargs):
        # employer_id = request.GET.get('employer_id')
        # recruiter = Recruiter.objects.get(id=employer_id)
        # user = recruiter_details.user
        # company = recruiter.company
        recruiter = Recruiter.objects.all()
        return render(request,'employer.html', {'recruiter':recruiter,})

class EditEmployer(View):
    def get(self,request,*args,**kwargs):
        recruiter_id = kwargs['employer_id']
        recruiter = Recruiter.objects.get(id=recruiter_id)
        user = recruiter.user
        company = recruiter.company
        context = {
            'recruiter_id' :recruiter_id,
            'recruiter':recruiter,
            'user':user,
            'company':company
        }
        # print  "Recruiter",recruiter
        # print  "User",user
        # print  "Company",company
        ctx_employer_data = []
        if request.is_ajax():
            ctx_employer_data.append ({
                'id' : recruiter_id,
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
        return render(request, 'edit_employer.html', context)
    def post(self,request,*args,**kwargs):
        recruiter_details = ast.literal_eval(request.POST['recruiter_details'])
        print recruiter_details
        print request.FILES
        status = 200
        if recruiter_details['id'] !=0 :
            recruiter = Recruiter.objects.get(id=recruiter_details['id'])
            user = recruiter.user
        else:  
            
            try:
                user.username = recruiter_details['email']
                user.save()
                res = {
                    'result': 'error',
                    'message': 'Email already exists',
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=status, mimetype='application/json')
            except Exception as ex:
                user.email = recruiter_details['email']
                user.save()
        recruiter.country = recruiter_details['country']
        recruiter.city = recruiter_details['city']
        recruiter.mobile = int(recruiter_details['mobile'])
        recruiter.land_num = int(recruiter_details['phone'])
        if recruiter.company:
            company = recruiter.company
        else:
            company = CompanyProfile()
        
        company.company_name = recruiter_details['name']
        company.industry_type = recruiter_details['industry']
        company_profile = request.FILES['profile_doc']
        if company_profile:
            company.company_profile = company_profile
        company.save()
        recruiter.company = company
        recruiter.save()
        user.save()
        
        res = {
            'result': 'ok',
            'recruiter_id': recruiter.id,
        }
        response = simplejson.dumps(res)

        return HttpResponse(response, status=status, mimetype='application/json')

class PostJobsView(View):
    def get(self,request,*args,**kwargs):
        recruiter = Recruiter.objects.get(user=request.user)
        
        context = {
            'company_name': recruiter.company.company_name,
        }
        return render(request, 'job_post.html', context)