
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.db.models import Q

from web.models import Job
import datetime as dt
from datetime import datetime

import ast
import simplejson
from datetime import datetime

from employer.models import CompanyProfile
from models import (Employment, Education, Jobseeker, PreviousEmployer, Doctorate, Location)
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

class JobseekerRegistration(View):

    def get(self, request, *args, **kwargs):
    	if request.user.is_authenticated():
            logout(request)
        return render(request, 'jobseeker_registration.html', {})

class Companies(View):

    def get(self, request, *args, **kwargs):
        companies = CompanyProfile.objects.all();
        companies_list = []
        for company in companies:
            companies_list.append({
                'id': company.id,
                'name': company.company_name,
                })
        res = {
            'result': 'ok',
            'companies': companies_list,
        }
        response = simplejson.dumps(res)
        return HttpResponse(response, mimetype='application/json')

class SaveUserLoginDetails(View):

      def post(self, request, *args, **kwargs):

        user_login_details = ast.literal_eval(request.POST['user_login_details'])
        status = 200
        if user_login_details['id'] != 0:
            job_seeker = Jobseeker.objects.get(id=user_login_details['id'])
            user = job_seeker.user
        else:
            try:
                user = User.objects.get(username=user_login_details['email'])
                res = {
                    'result': 'error',
                    'message': 'Email already exists',
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=status, mimetype='application/json')
            except Exception as ex:
                user = User.objects.create(username=user_login_details['email'])
                user.set_password(user_login_details['password'])
                user.save()
                job_seeker = Jobseeker.objects.create(user=user)
                user = authenticate(username=user_login_details['email'], password=user_login_details['password'])
                if user and user.is_active:
                    login(request, user)
                    message = 'Logged in'
                else:
                    message = 'Not logged in' 
        user.first_name = user_login_details['first_name']
        user.last_name = user_login_details['last_name']
        user.email = user_login_details['email']
        user.save()  
        res = {
            'result': 'ok',
            'job_seeker_id': job_seeker.id,
        }
        response = simplejson.dumps(res)
        return HttpResponse(response, status=status, mimetype='application/json')

class SavePersonalDetails(View):

    def post(self, request, *args, **kwargs):

        personal_details = ast.literal_eval(request.POST['personal_details'])
        status = 200
        print personal_details['id']
        if personal_details['id']:
            job_seeker = Jobseeker.objects.get(id=personal_details['id'])   
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
        print current_employer_details
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
            prefered_locations = current_employer_details['locations']
            if job_seeker.prefered_locations:
                job_seeker.prefered_locations.clear()
            for prefered_location in prefered_locations:
                location, created = Location.objects.get_or_create(location=prefered_location)
                job_seeker.prefered_locations.add(location)                     
                job_seeker.save()
            prefered_companies = current_employer_details['selected_companies']
            if job_seeker.prefered_companies:
                job_seeker.prefered_companies.clear()
            for prefered_company in prefered_companies:
                job_seeker.prefered_companies.add(prefered_company)                     
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
        print request.POST['resume_details']
        resume_details = ast.literal_eval(request.POST['resume_details'])
        status = 200
        if resume_details['id']:
            job_seeker = Jobseeker.objects.get(id=resume_details['id'])
            if job_seeker.education:
                education = job_seeker.education
            else:
                education = Education()
            education.resume_title = resume_details['resume_title']
            
            if resume_details['remove_resume'] == 'true':
                education.resume = ''
            else:
                if request.FILES.get('resume_doc', ''):
                    education.resume = request.FILES['resume_doc']
            if resume_details['is_resume_show'] == 'true':
                education.is_resume_show = True 
            else:
                education.is_resume_show = False 
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
        if photo_details['id']:
            job_seeker = Jobseeker.objects.get(id=photo_details['id'])
            if request.FILES.get('photo_img', ''):
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
        if request.user.is_superuser:
            jobseekers = Jobseeker.objects.all()
            
            paginator = Paginator(jobseekers, 20) # Show 25 contacts per page

            page = request.GET.get('page')
            try:
                jobseekers = paginator.page(page)
            except PageNotAnInteger:
                # If page is not an integer, deliver first page.
                jobseekers = paginator.page(1)
            except EmptyPage:
                # If page is out of range (e.g. 9999), deliver last page of results.
                jobseekers = paginator.page(paginator.num_pages)
            context={
                'jobseekers':jobseekers,
            }
        else:
            jobseeker_id =  request.user.jobseeker_set.all()[0].id
            context={
                'jobseeker_id':jobseeker_id,
            }
        return render(request,'jobseeker_details.html', context)    

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
            'user': user,
            'employment': employment,
            'education': education,
        }
        ctx_user_login_data = []
        ctx_jobseeker_data = []
        ctx_education_data = []
        ctx_previous_company = []
        ctx_employment_data = []
        ctx_education_data = []
        ctx_doctorate = []
        ctx_resume = []
        ctx_photo = []
        ctx_locations = []
        ctx_companies = []
        if jobseeker.employment.previous_employer.all().count() > 0:
            for employer in jobseeker.employment.previous_employer.all().order_by('-id'):
                ctx_previous_company.append({
                    'employer': employer.previous_employer_name,
                })
        if jobseeker.education.doctrate.all().count() > 0: 
            for doctrate in jobseeker.education.doctrate.all().order_by('-id'):
                ctx_doctorate.append({
                    'doctorate': doctrate.doctorate_name,
                })
        if jobseeker.prefered_locations.all().count() > 0:
            for location in jobseeker.prefered_locations.all().order_by('-id'):
                ctx_locations.append(location.location)
        if jobseeker.prefered_companies.all().count() > 0:
            for company in jobseeker.prefered_companies.all().order_by('-id'):
                ctx_companies.append({
                    'id': company.id,
                    'name': company.company_name,
                    })
        if request.is_ajax():
            
            ctx_user_login_data.append({
                'id': jobseeker_id if jobseeker else '',
                'email': user.email if user else '',
                'first_name': user.first_name if user else '',
                'last_name': user.last_name if user else '',
                })

            ctx_jobseeker_data.append ({
                
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
                'locations': ctx_locations,
                'companies': ctx_companies,
            })
            ctx_education_data.append ({
                'id': jobseeker_id if jobseeker else '',
                'basic_edu': education.basic_edu if education else '',
                'basic_specialization': education.basic_edu_specialization if education else '',
                'pass_year_basic': education.pass_year_basic if education else '',
                'masters_edu': education.masters if education else '',
                'master_specialization': education.masters_specialization if education else '',
                'pass_year_masters': education.pass_year_masters if education else '',
                'doctorate': ctx_doctorate,
            })
            ctx_resume.append({
                'id': jobseeker_id if jobseeker else '',
                'resume_title': jobseeker.education.resume_title if jobseeker.education else '' ,
                'resume_text': jobseeker.education.resume_text if jobseeker.education else '' ,
                'resume': jobseeker.education.resume.name if jobseeker.education else '' ,
                'remove_resume': 'false',
                'is_resume_show': True if jobseeker.education.is_resume_show else False,  
            })
            ctx_photo.append({
                'id': jobseeker_id if jobseeker else '',
                'profile_photo': jobseeker.photo.name if jobseeker else '',
            })
            res ={
                'user_login_details': ctx_user_login_data,
                'personal': ctx_jobseeker_data,
                'educational_details': ctx_education_data,
                'current_employer': ctx_employment_data,
                'resume_details': ctx_resume,
                'photo_details': ctx_photo,
            }
            response = simplejson.dumps(res)    
            return HttpResponse(response, status=200, mimetype='application/json')
        return render(request, 'jobseeker_details.html', context)

class SearchJobsView(View):

    def get(self, request, *args, **kwargs):

        search = False
        jobs_not_exist = False
        location = request.GET.get('location', '')
        function = request.GET.get('function', '')
        print function
        skills = request.GET.get('skills', '')
        exp = request.GET.get('experience', '')
        industry = request.GET.get('industry', '')
        print industry
        search_flag = request.GET.get('search', '')
        if search_flag == 'true':
            search = True
        jobs = []
        if location and industry and skills  and not search:
            jobs = Job.objects.filter(Q(job_location__icontains=location) , Q(industry=industry), Q(skills__icontains=skills), is_publish=True).order_by('-id').order_by('order')

            if not jobs.exists():
                searched_for = str('"'+skills+ '-'+industry+'-'+location+'"')
        
        elif location  and not skills  and not industry and not search: 
            jobs = Job.objects.filter(job_location__icontains=location, is_publish=True).order_by('-id').order_by('order')    
            if not jobs.exists():
                searched_for = str('"'+location+'"')       
        elif industry and not location and not skills and not search:
            jobs = Job.objects.filter(industry=industry, is_publish=True).order_by('-id').order_by('order')
            print jobs
            if not jobs.exists():
                searched_for = str('"'+industry+'"')
        elif skills and not location  and not industry and not search:
            jobs = Job.objects.filter(skills__icontains=skills, is_publish=True).order_by('-id').order_by('order')
            if not jobs.exists():
                searched_for = str('"'+skills+'"')  
        else: 
            if location == 'undefined':
                location = ''
            if function == 'undefined':
                function = ''
            if skills == 'undefined':
                skills = ''
            if industry == 'undefined':
                industry = ''
            print exp
            if exp == 'undefined' or exp == '':
                jobs = Job.objects.filter(Q(Q(job_title__icontains=skills) | Q(skills__icontains=skills)), Q(job_location__contains=location, function__contains=function, is_publish=True)).order_by('-id').order_by('order')
            else:
                jobs = Job.objects.filter(Q(Q(job_title__icontains=skills) | Q(skills__icontains=skills)), Q(job_location__contains=location, function__contains=function, exp_req_min__lte=int(exp), exp_req_max__gte=int(exp), is_publish=True)).order_by('-id').order_by('order')
            try:
                for job in jobs:                
                    job.search_count = job.search_count+1
                    job.save()
            except:
                pass
            if not jobs.exists():
                searched_for = '' 
        print jobs
        context = {
            'jobs': jobs,
        }
        searched_for = ''

        if len(jobs) == 0:
            context.update({
                'searched_for': searched_for,
                'jobs_not_exist' : True,
                'search_location' : location if location else '',
                'search_keyword' : skills if skills else '',
                'search_experience' : exp if exp else '',
                'search_function_name' : function if function else '',
                'search_industry' : industry if industry else '',
            })
            return render(request, 'search.html', context)
        else:
            context.update({
                'search_location' : location if location else '',
                'search_keyword' : skills if skills else '',
                'search_experience': exp if exp else '',
                'search_function_name' : function if function else '',
                'search_industry' : industry if industry else '',
                'search_flag': search,
            })
            return render(request, 'search_jobs.html', context) 

class SearchView(View):

    def get(self, request, *args, **kwargs):
        context = {}
        location = request.GET.get('location', '')
        skills = request.GET.get('skills', '')
        function = request.GET.get('function', '')
        industry = request.GET.get('industry', '')
        if location:
            context = {
                'location': True,
            }          

        elif skills:
            context = {
                'skills': True,
            }        

        elif function:
            context = {
                'function': True,
            }        

        elif industry:
            context = {
                'industry': True,
            }

        return render(request, 'search.html', context) 

class ApplyJobs(View):

    def get(self, request, *args, **kwargs):

        current_user = request.user
        current_date = dt.datetime.now().date()
        context = {}
        job = Job.objects.get(id = kwargs['job_id'])

        
        jobseeker, created = Jobseeker.objects.get_or_create(user = current_user)
        if job.last_date:
            if job.last_date < current_date:
                context = {
                    'message' : 'Time expired, you cannot apply',
                    'job' : job,
                    'not_able_to_apply': True
                }
                return render(request, 'job_details.html', context)
        print type(job),job
        jobseeker.applied_jobs.add(job)
        jobseeker.save()
        job.applicants_count = job.applicants_count + 1
        job.save()

        context = {
            'job' : job,
        }

        return render(request, 'job_details.html', context)


class JobDetails(View):

    def get(self, request, *args, **kwargs):

        context = {}
        job = Job.objects.get(id = kwargs['job_id'])
        context = {
            'job' : job,
        }
        return render(request, 'job_details.html', context)
   

class ActivityLog(View):

    def get(self, request, *args, **kwargs):
        jobseeker_id =  request.user.jobseeker_set.all()[0].id
        jobseeker = Jobseeker.objects.get(id=jobseeker_id)
        applied_jobs = jobseeker.applied_jobs.all()
        applied_jobs_list = []

        for job in applied_jobs:
            applied_jobs_list.append({
                'job_title': job.job_title,
                'recruiter': job.company.company_name,
                'job_location': job.job_location,
                'last_date': job.last_date,
                'description': job.description,
                })
        
        context = {
        'applied_jobs': applied_jobs_list,
        }
             
        return render(request, 'activity_log.html',context)

