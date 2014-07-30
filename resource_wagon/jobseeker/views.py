
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

import ast
import simplejson
from datetime import datetime

from models import (Employment, Education, Doctorate, Jobseeker)

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
            employment.curr_industry = current_employer_details['currency']
            employment.function = current_employer_details['functions']
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


