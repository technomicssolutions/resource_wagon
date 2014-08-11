
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

from os import urandom
from base64 import b64encode, b64decode
from Crypto.Cipher import ARC4

from hashlib import sha1

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
            user = jobseeker.user
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
        user = authenticate(username=personal_details['email'], password=personal_details['password'])
    
        if user and user.is_active:
            login(request, user)
            message = 'Logged in'
            is_logged_in = True
        else:
            message = 'Not logged in'        
        res = {
            'result': 'ok',
            'job_seeker_id': job_seeker.id,
        }

        response = simplejson.dumps(res)

        return HttpResponse(response, status=status, mimetype='application/json')

class SaveCurrentEmployerDetails(View):

    def post(self, request, *args, **kwargs):

        current_employer_details = ast.literal_eval(request.POST['current_employer_details'])
        print current_employer_details
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
            employment.curr_industry = current_employer_details['currency']
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
        print educational_details
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
            # if seeker['masters_edu'] != "":
            education.masters = educational_details['masters_edu']
            # if seeker['master_specialization'] != "":
            education.masters_specialization = educational_details['master_specialization']
            if educational_details['pass_year_masters'] != "":
                education.pass_year_masters = int(educational_details['pass_year_masters'])
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
        return render(request,'jobseeker_details.html', {})    