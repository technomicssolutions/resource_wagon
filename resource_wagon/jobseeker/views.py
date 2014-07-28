
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

from models import (Employment, Education, Doctorate, Jobseeker)

class JobseekerRegistration(View):

    def get(self, request, *args, **kwargs):
    	if request.user.is_authenticated():
            logout(request, request.user)
        return render(request, 'jobseeker_registration.html', {})

    def post(self, request, *args, **kwargs):

        post_data = request.POST
        print post_data
        seeker = ast.literal_eval(post_data['seeker'])
        try:
            if request.user.is_authenticated():
                user = request.user
                user_created = False
                logout(request, user)
            else:
                user, user_created = User.objects.get_or_create(username=seeker['email'])
                if not user_created:
                    if request.is_ajax():
                        res = {
                            'message': 'User already exists',
                            'result': 'error',
                        }
                        response = simplejson.dumps(res)
                        status_code = 200
                        return HttpResponse(response, status = status_code, mimetype='application/json')
            if user.email != seeker['email']:
                user.username = seeker['email']
            user.email=seeker['email']
            user.first_name=seeker['first_name']
            if user_created:
                user.set_password(seeker['password'])
            user.save()
        except IntegrityError, ex:
            status_code = 200
            response = simplejson.dumps({
                'result': 'error', 
                'message': 'User already exists'
            })
            return HttpResponse(response, status = status_code, mimetype = 'application/json')
        
        
        

        job_seeker = JobSeeker()
        job_seeker.country = seeker['country']
        job_seeker.city = seeker['city']
        job_seeker.mobile = seeker['mobile']
        job_seeker.gender = seeker['gender']
        job_seeker.dob = datetime.strptime(seeker['dob'], '%d-%m-%Y')
        current_year = dt.datetime.now().year        
        age = current_year - job_seeker.dob.year
        job_seeker.age = age
        job_seeker.marital_status = seeker['marital_status']
        job_seeker.nationality = seeker['nationality']
        
        if seeker['alt_email'] != "":
            job_seeker.alt_mail = seeker['alt_email']
        job_seeker.save()

        education = Education()
        employment = Employment()

        if seeker['years'] != "":
            employment.exp_yrs = int(seeker['years'])
        if seeker['months'] != "":
            employment.exp_mnths = int(seeker['months'])
        if seeker['salary'] != "":
            employment.salary = int(seeker['salary'])
        employment.currency = seeker['currency']
        if seeker['designation'] != "":
            employment.designation = seeker['designation']
        if seeker['industry'] != "":
            employment.curr_industry = seeker['industry']
        if seeker['functions'] != "":
            employment.function = seeker['functions']
        employment.skills = seeker['skills']
        employment.save()
        previous_employers = ast.literal_eval(seeker['previous_company'])
        if employment.previous_employer:
            employment.previous_employer.clear()
        if len(previous_employers) > 0:
            for employer in previous_employers:
                if len(employer['employer']) > 0 and not employer['employer'].isspace():
                    employer_obj, created = PreviousEmployer.objects.get_or_create(previous_employer_name = employer['employer'])
                    employment.previous_employer.add(employer_obj)
        job_seeker.employment = employment
        job_seeker.save()
        education.basic_edu = seeker['basic_edu']
        education.basic_edu_specialization = seeker['basic_specialization']
        education.pass_year_basic = int(seeker['pass_year_basic'])
        if seeker['masters_edu'] != "":
            education.masters = seeker['masters_edu']
        if seeker['master_specialization'] != "":
            education.masters_specialization = seeker['master_specialization']
        if seeker['pass_year_masters'] != "":
            education.pass_year_masters = int(seeker['pass_year_masters'])
        education.save()
        doctrate = ast.literal_eval(seeker['doctrate'])
        if education.doctrate:
            education.doctrate.clear()
        if len(doctrate) > 0: 
            for doctrate_name in doctrate:
                if len(doctrate_name['name']) > 0 and not doctrate_name['name'].isspace():
                    doctorate, created = Doctorate.objects.get_or_create(doctorate_name = doctrate_name['name'])
                    education.doctrate.add(doctorate)
        
        job_seeker.education = education
        
        photo = request.FILES.get('photo_img', '')
        if photo:
            jobseeker.photo = photo
        jobseeker.save()
        education = jobseeker.education
        # certificate = request.FILES.get('certificate_img', '')
        # if certificate:
        #     education.certificate = certificate

        education.resume_title = seeker['resume_title']

        resume = request.FILES.get('resume_doc', '')
        if resume:
            education.resume = resume
        
       
        education.resume_text = seeker['resume_text']
        education.save()
        jobseeker.education = education
        jobseeker.save()

        no_of_attachment_files = request.POST['certificate_attachment_length']
        i = 0
        # if no_of_attachment_files > 0:
            # education.certificate.clear()
        for i in range(int(no_of_attachment_files)):
            file_name = 'certificate_attachment' + str(i)
            certificate_attachment_file = request.FILES.get(file_name,'')
            if certificate_attachment_file:
                certificates = Certificates()
                certificates.certificate_name = certificate_attachment_file
                certificates.save()
                education.certificate.add(certificates)
                education.save()
            else:
                pass

        job_seeker.save()
        if user_created:
            login_user = authenticate(username=seeker['email'], password=seeker['password'])
            if login_user and login_user.is_active:
                login(request, login_user)
        res = {
            'result': 'ok',
            'user_id': user.id,
        }
        response = simplejson.dumps(res)
        status_code = 200
        return render(request, 'jobseeker_registration.html', context)
        return HttpResponseRedirect(reverse('home'))