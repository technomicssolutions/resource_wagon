
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

import ast
import simplejson
from datetime import datetime

from models import (Employment, Education, Jobseeker, PreviousEmployer,Doctorate)

class JobseekerRegistration(View):

    def get(self, request, *args, **kwargs):
    	if request.user.is_authenticated():
            logout(request)
        return render(request, 'jobseeker_registration.html', {})

class SavePersonalDetails(View):

    def post(self, request, *args, **kwargs):

        personal_details = ast.literal_eval(request.POST['personal_details'])
        status = 200
        if personal_details['id'] != 0:
            job_seeker = Jobseeker.objects.get(id=personal_details['id'])
            user = job_seeker.user
        else:
            try:
                user = User.objects.get(username=personal_details['email'])
                res = {
                    'result': 'error',
                    'message': 'Email already exists',
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=status, mimetype='application/json')
            except Exception as ex:
                user = User.objects.create(username=personal_details['email'])
                user.set_password(personal_details['password'])
                user.save()
                job_seeker = Jobseeker.objects.create(user=user)
                user = authenticate(username=personal_details['email'], password=personal_details['password'])
                if user and user.is_active:
                    login(request, user)
                    message = 'Logged in'
                else:
                    message = 'Not logged in' 
        user.first_name = personal_details['first_name']
        user.last_name = personal_details['last_name']
        user.email = personal_details['email']
        user.save()
        current_year = datetime.now().year
        b_year = datetime.strptime(personal_details['dob'], '%d/%m/%Y').year
        age = current_year - b_year
        job_seeker.gender = personal_details['gender']
        job_seeker.nationality = personal_details['nationality']
        job_seeker.dob = datetime.strptime(personal_details['dob'], '%d/%m/%Y')
        job_seeker.marital_status = personal_details['marital_status']
        job_seeker.age = age
        job_seeker.alt_mail = personal_details['alt_email']
        job_seeker.country = personal_details['country']
        job_seeker.city = personal_details['city']
        job_seeker.mobile = personal_details['mobile']
        job_seeker.save()
               
        res = {
            'result': 'ok',
            'job_seeker_id': job_seeker.id,
        }

        response = simplejson.dumps(res)

        return HttpResponse(response, status=status, mimetype='application/json')

class SaveCurrentEmployerDetails(View):

    def post(self, request, *args, **kwargs):

        current_employer_details = ast.literal_eval(request.POST['current_employer_details'])
        status = 200
        if current_employer_details['id']:
            job_seeker = Jobseeker.objects.get(id=current_employer_details['id'])
            if job_seeker.employment:
                employment = job_seeker.employment
            else:
                employment = Employment()
            employment.exp_yrs = current_employer_details['years']
            employment.exp_mnths = current_employer_details['months']
            employment.salary = current_employer_details['salary']
            employment.designation = current_employer_details['designation']
            employment.skills = current_employer_details['skills']
            employment.currency = current_employer_details['currency']
            employment.curr_industry = current_employer_details['industry']
            employment.function = current_employer_details['functions']
            employment.save()
            employment.previous_employer.clear()
            employers = ast.literal_eval(current_employer_details['employers'])
            for employer in employers:
                if len(employer['employer']) > 0 and not employer['employer'].isspace():
                    employer_obj, created = PreviousEmployer.objects.get_or_create(previous_employer_name = employer['employer'])
                    employment.previous_employer.add(employer_obj)
            employment.save()
            job_seeker.employment = employment
            job_seeker.save()
            res = {
                'result': 'ok',
                'job_seeker_id': job_seeker.id,
            }
            response = simplejson.dumps(res)

            return HttpResponse(response, status=status, mimetype='application/json')

class SaveEducationalDetails(View):

    def post(self, request, *args, **kwargs):

        educational_details = ast.literal_eval(request.POST['educational_details'])
        status = 200
        if educational_details['id']:
            job_seeker = Jobseeker.objects.get(id=educational_details['id'])
            if job_seeker.education:
                education = job_seeker.education
            else:
                education = Education()
            education.basic_edu = educational_details['basic_edu']
            education.basic_edu_specialization = educational_details['basic_specialization']
            education.pass_year_basic = int(educational_details['pass_year_basic'])
            if educational_details['masters_edu'] != "":
                education.masters = educational_details['masters_edu']
                if educational_details['master_specialization'] != "":
                    education.masters_specialization = educational_details['master_specialization']
                if educational_details['pass_year_masters'] != "":
                    education.pass_year_masters = int(educational_details['pass_year_masters'])
            else:
                education.masters = ''
                education.masters_specialization = ''
                education.pass_year_masters = None
            doctrate = ast.literal_eval(educational_details['doctrate'])
            education.save()
            if education.doctrate:
                education.doctrate.clear()
            for doctrate_name in doctrate:
                if len(doctrate_name['name']) > 0 and not doctrate_name['name'].isspace():
                    doctorate, created = Doctorate.objects.get_or_create(doctorate_name = doctrate_name['name'])
                    education.doctrate.add(doctorate)
            education.save()
            job_seeker.education = education
            job_seeker.save()
            res = {
                'result': 'ok',
                'job_seeker_id': job_seeker.id,
            }
            response = simplejson.dumps(res)

            return HttpResponse(response, status=status, mimetype='application/json')

class SaveResumeDetails(View):
    def post(self, request, *args, **kwargs):
        resume_details = ast.literal_eval(request.POST['resume_details'])
        status = 200
        if resume_details['id']:
            job_seeker = Jobseeker.objects.get(id=resume_details['id'])
            if job_seeker.education:
                education = job_seeker.education
            else:
                education = Education()

            education.resume_title = resume_details['resume_title']
            if request.FILES.get('resume_doc', ''):
                education.resume = request.FILES['resume_doc']
            education.resume_text = resume_details['resume_text']
            education.save()
            job_seeker.education = education
            job_seeker.save()
            res = {
                'result': 'ok',
                'job_seeker_id': job_seeker.id,
            }
            response = simplejson.dumps(res)

            return HttpResponse(response, status=status, mimetype='application/json')

class SavePhotoDetails(View):
    def post(self, request, *args, **kwargs):
        photo_details = ast.literal_eval(request.POST['photo_details'])
        status = 200
        is_logged_in = False
        if photo_details['id']:
            job_seeker = Jobseeker.objects.get(id=photo_details['id'])
            job_seeker.photo = request.FILES['photo_img']
            job_seeker.save()
            
            res = {
                'result': 'ok',
                'job_seeker_id': job_seeker.id,
            }
            response = simplejson.dumps(res)

            return HttpResponse(response, status=status, mimetype='application/json')

class JobSeekerView(View):
    def get(self, request, *args, **kwargs):
        jobseeker_id =  request.user.jobseeker_set.all()[0].id
        return render(request,'jobseeker_details.html', {'jobseeker_id':jobseeker_id,})    

class EditDetails(View):
    def get(self,request,*args,**kwargs):
        jobseeker_id = kwargs['jobseeker_id']
        jobseeker = Jobseeker.objects.get(id=jobseeker_id)
        user = jobseeker.user
        employment = jobseeker.employment
        education = jobseeker.education
        context ={
            'jobseeker_id': jobseeker_id,
            'jobseeker': jobseeker,
            'user':user,
            'employment':employment,
            'education':education,
        }
        ctx_jobseeker_data = []
        ctx_education_data = []
        ctx_previous_company = []
        ctx_employment_data = []
        ctx_education_data = []
        ctx_doctorate = []
        ctx_resume = []
        ctx_photo = []
        if jobseeker.employment.previous_employer.all().count() > 0:
            for employer in jobseeker.employment.previous_employer.all():
                ctx_previous_company.append({
                    'employer': employer.previous_employer_name,
                })
        if jobseeker.education.doctrate.all().count() > 0: 
            for doctrate in jobseeker.education.doctrate.all():
                ctx_doctorate.append({
                    'doctorate': doctrate.doctorate_name,
                })
        if request.is_ajax():
            ctx_jobseeker_data.append ({
                'id': jobseeker_id if jobseeker else '',
                'email': user.email if user else '',
                'first_name': user.first_name if user else '',
                'last_name': user.last_name if user else '',
                'gender':jobseeker.gender if jobseeker else '',
                'dob': jobseeker.dob.strftime('%d/%m/%Y') if jobseeker else '',
                'marital_status':jobseeker.marital_status if jobseeker else '',
                'nationality':jobseeker.nationality if jobseeker else '',
                'country':jobseeker.country if jobseeker else '',
                'city':jobseeker.city if jobseeker else '',
                'mobile':jobseeker.mobile if jobseeker else '',
                'alt_email': jobseeker.alt_mail if jobseeker else '',

            })
            ctx_employment_data.append ({
                'id': jobseeker_id if jobseeker else '',
                'years': employment.exp_yrs if employment else '',
                'months': employment.exp_mnths if employment else '',
                'salary': employment.salary if employment else '',
                'designation':employment.designation if employment else '',
                'skills':employment.skills if employment else '',
                'currency':employment.currency if employment else '',
                'industry':employment.curr_industry if employment else '',
                'functions':employment.function if employment else '',
                'employers': ctx_previous_company,
            })
            ctx_education_data.append ({
                'id': jobseeker_id if jobseeker else '',
                'basic_edu': education.basic_edu if education else '',
                'basic_specialization': education.basic_edu_specialization if education else '',
                'pass_year_basic': education.pass_year_basic if education else '',
                'masters_edu':education.masters if education else '',
                'master_specialization':education.masters_specialization if education else '',
                'pass_year_masters':education.pass_year_masters if education else '',
                'doctorate': ctx_doctorate,
            })
            ctx_resume.append({
                'id': jobseeker_id if jobseeker else '',
                'resume_title': jobseeker.education.resume_title if jobseeker.education else '' ,
                'resume_text': jobseeker.education.resume_text if jobseeker.education else '' ,
                'resume': jobseeker.education.resume.name if jobseeker.education else '' ,
            })
            ctx_photo.append({
                'id': jobseeker_id if jobseeker else '',
                'profile_photo': jobseeker.photo.name if jobseeker else '',
            })
            res ={
                'personal': ctx_jobseeker_data,
                'educational_details': ctx_education_data,
                'current_employer': ctx_employment_data,
                'resume_details': ctx_resume,
                'photo_details': ctx_photo,
            }
            response = simplejson.dumps(res)    
            return HttpResponse(response, status=200, mimetype='application/json')
        return render(request, 'jobseeker_details.html', context)
