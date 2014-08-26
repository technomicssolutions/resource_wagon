
import ast
import simplejson
import operator
from datetime import datetime
import datetime as dt


from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q

from web.models import Job



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
                user = User.objects.get(email=user_login_details['email'])
                res = {
                    'result': 'error',
                    'message': 'Email already exists',
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=status, mimetype='application/json')
            except Exception as ex:
                if len(user_login_details['email']) > 30:
                    username = user_login_details['email'][:30]
                else:
                    username = user_login_details['email']
                user = User.objects.create(email=user_login_details['email'], username=username)
                print "user", user
                user.set_password(user_login_details['password'])
                user.save()
                job_seeker = Jobseeker.objects.create(user=user)
                user = authenticate(username=username, password=user_login_details['password'])
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

class JobseekerDashboard(View):

    def get(self, request, *args, **kwargs):

        return render(request,'jobseeker_dashboard.html', {}) 

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
            return render(request,'jobseeker_profile.html', context)     
        else:
            print request.user
            if request.user.is_authenticated():
                jobseeker_id =  request.user.jobseeker_set.all()[0].id
                context={
                        'jobseeker_id':jobseeker_id,
                } 
            else:
                context = {
                    'message':'You are not permitted to view this page',
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

        if employment:            
            if employment.previous_employer.all().count() > 0:
                for employer in employment.previous_employer.all().order_by('-id'):
                    ctx_previous_company.append({
                        'employer': employer.previous_employer_name,
                    })
        if education:
            if education.doctrate.all().count() > 0: 
                for doctrate in education.doctrate.all().order_by('-id'):
                    ctx_doctorate.append({
                        'doctorate': doctrate.doctorate_name,
                    })
        if jobseeker.prefered_locations:
            if jobseeker.prefered_locations.all().count() > 0:
                for location in jobseeker.prefered_locations.all().order_by('-id'):
                    ctx_locations.append(location.location)
        if jobseeker.prefered_companies:
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
                'username': user.username if user else '',
                })

            ctx_jobseeker_data.append ({
                
                'gender':jobseeker.gender,
                'dob': jobseeker.dob.strftime('%d/%m/%Y') if jobseeker.dob else '',
                'marital_status':jobseeker.marital_status ,
                'nationality':jobseeker.nationality,
                'country':jobseeker.country,
                'city':jobseeker.city,
                'mobile':jobseeker.mobile,
                'alt_email': jobseeker.alt_mail,

            })
            ctx_employment_data.append ({
                'id': jobseeker_id,
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
                'resume_title': education.resume_title if education else '' ,
                'resume_text': education.resume_text if education else '' ,
                'resume': education.resume.name if education else '' ,
                'remove_resume': 'false',
                'is_resume_show': education.is_resume_show if education else False,  
            })
            ctx_photo.append({
                'id': jobseeker_id if jobseeker else '',
                'profile_photo': jobseeker.photo.name if jobseeker.photo else '',
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

class JobSearch(View):

    def get(self, request, *args, **kwargs):

        searched_for = ''
        location = request.GET.get('location', '')
        function = request.GET.get('function', '')
        skills = request.GET.get('skills', '')
        exp = request.GET.get('experience', '')
        industry = request.GET.get('industry', '')
        keyword = request.GET.get('keyword', '')
        jobs = []
        q_list = []
        if location:
            q_list.append(Q(job_location__icontains=location))
        if function:
            q_list.append(Q(function__icontains=function))
        if skills:
            q_list.append(Q(skills__icontains=skills))
        if exp:
            q_list.append(Q(exp_req_min__lte=int(exp), exp_req_max__gte=int(exp)))
        if industry:
            q_list.append(Q(industry__icontains=industry))
        if keyword:
            q_list.append(Q(job_title__icontains=keyword)|\
                            Q(skills__icontains=keyword)|\
                            Q(industry__icontains=keyword)|\
                            Q(function__icontains=keyword)|\
                            Q(job_location__icontains=keyword))

        if len(q_list) > 0:
            jobs = Job.objects.filter(reduce(operator.or_, q_list), is_publish=True).order_by('-id').order_by('order')
        else:
            jobs = []

        
        job_list = []
       
        for job in jobs:                
            job.search_count = job.search_count+1
            job.save()
            job_list.append({
                'job_title': job.job_title,
                'id': job.id,
                'company_name': job.company.company_name,
                'industry': job.industry,
                'function': job.function,
                'education_req': job.education_req,
                'exp_req_min': job.exp_req_min,
                'exp_req_max': job.exp_req_max,
            })
        context = {
            'jobs': jobs,
        }
        if request.is_ajax():
            response = simplejson.dumps({
                'jobs': job_list
            })    
            return HttpResponse(response, status=200, mimetype='application/json')
        else:
            if len(jobs) == 0:
                context.update({
                    'searched_for': searched_for,
                    'jobs_not_exist' : True,
                    'location' : location if location else '',
                    'keyword' : skills if skills else '',
                    'experience' : exp if exp else '',
                    'function_name' : function if function else '',
                    'industry' : industry if industry else '',
                })
            else:
                context.update({
                    'location' : location if location else '',
                    'keyword' : skills if skills else '',
                    'experience': exp if exp else '',
                    'function_name' : function if function else '',
                    'industry' : industry if industry else '',
                })
        return render(request, 'job_search.html', context) 

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
        last_login = request.user.last_login
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
        'last_login': last_login,
        }
             
        return render(request, 'jobseeker_activity_log.html',context)

