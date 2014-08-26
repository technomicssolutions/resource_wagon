
import simplejson
import ast
from datetime import datetime
import operator


from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q

from models import CompanyProfile,Recruiter
from jobseeker.models import Jobseeker
from web.models import Job, RequestSend, Reply



class EmployerRegistration(View):

    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, 'employer_registration.html', context)

class SaveEmployer(View):
    
    def post(self, request, *args, **kwargs):
        recruiter_details = ast.literal_eval(request.POST['recruiter_details'])
        status = 200
        if request.user.is_authenticated() :
            user = request.user
            if user.recruiter_set.all().count() > 0:
                recruiter = user.recruiter_set.all()[0]
            else:
                recruiter = Recruiter.objects.create(user=user)
        else:           
            try:
                user = User.objects.get(email=recruiter_details['email'])
                res = {
                    'result': 'error',
                    'message': 'Email already exists',
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=status, mimetype='application/json')
            except:
                if len(recruiter_details['email']) > 30:
                    username = recruiter_details['email'][:30]
                else:
                    username = recruiter_details['email']
                user = User.objects.create(email=recruiter_details['email'], username=username)
                user.set_password(recruiter_details['password'])
                user.email = recruiter_details['email']
                user.save()
                if not request.user.is_authenticated():
                    user = authenticate(username=user.username, password=recruiter_details['password'])
                if user and user.is_active:
                    login(request, user)
                recruiter = Recruiter.objects.create(user=user)
        recruiter.country = recruiter_details['country']
        recruiter.city = recruiter_details['city']
        recruiter.mobile = recruiter_details['mobile']
        if recruiter_details['phone']:
            recruiter.land_num = recruiter_details['phone']
        try:
            company = CompanyProfile.objects.get(company_name = recruiter_details['name'])
            if company.recruiter_set.all()[0] != recruiter:
                res = {
                    'result': 'error',
                    'recruiter_id': recruiter.id,
                    'message': 'This company already exists'
                }
                response = simplejson.dumps(res)
                return HttpResponse(response, status=status, mimetype='application/json')
            else:
                company.company_name = recruiter_details['name']
                company.save()
        except:
            company = CompanyProfile.objects.create(company_name = recruiter_details['name'])                            
            recruiter.company = company
            recruiter.save()
        company.industry_type = recruiter_details['industry']
        company.description = recruiter_details['description']
        if request.FILES.get('profile_doc', ''):
            company_profile = request.FILES['profile_doc']       
            company.company_profile = company_profile
        if request.FILES.get('logo', ''):
            logo = request.FILES['logo']
            company.photo = logo
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

class DashBoardEmployer(View):
     
     def get(self, request, *args, **kwargs):

        return render(request,'employer_dashboard.html', {})  

class EmployerView(View):

    def get(self, request, *args, **kwargs):
        if  request.user.is_superuser:
            recruiters = Recruiter.objects.all()
            paginator = Paginator(recruiters, 20) 
            page = request.GET.get('page')
            try:
                recruiters = paginator.page(page)
            except PageNotAnInteger:
                recruiters = paginator.page(1)
            except EmptyPage:
                recruiters = paginator.page(paginator.num_pages)
            context = {
                'recruiters':recruiters,                
            }
            return render(request,'employer_profile.html', context)
        else:
            recruiter = Recruiter.objects.get(user=request.user)
            context = {
                'recruiter': recruiter,
            }
        return render(request,'employer.html', context)   


class GetJobs(View):
    def get(self,request,*args,**kwargs):
        jobs = Job.objects.all()
        jobs_list = []
        for job in jobs:
            jobs_list.append({
                'id': job.id,
                'recruiter': job.company.company_name,
                'job_title': job.job_title,
                'post_date': str(job.posting_date),
                 'last_date': str(job.last_date),
                })
        res ={
            'jobs_list': jobs_list,
        }
        response = simplejson.dumps(res)    
        return HttpResponse(response, status=200, mimetype='application/json')


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
        ctx_employer_data = []
        if request.is_ajax():
            ctx_employer_data.append ({
                'id' : recruiter_id,
                'user': user.username,
                'email': user.email if user.email else '',
                'country':recruiter.country if recruiter else '',
                'city': recruiter.city if recruiter else '',
                'mobile': recruiter.mobile if recruiter else '',
                'phone':recruiter.land_num if recruiter else '',
                'name': company.company_name if company else '',
                'industry': company.industry_type if company else '',
                'description': company.description if company else '',
                'company_profile': company.company_profile.name if company.company_profile else '',
                'photo': company.photo.name if company.company_profile else '',
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
        if request.is_ajax():
            res ={
                'company_name': recruiter.company.company_name,
            }
            response = simplejson.dumps(res)    
            return HttpResponse(response, status=200, mimetype='application/json')
        
        context = {
            'company_name': recruiter.company.company_name,
        }
        return render(request, 'job_post.html', context)
    def post(self, request, *args, **kwargs):

        current_user = request.user
        
        jobPosting = Job.objects.create(recruiter = current_user)
        post_data = request.POST
        jobpost = ast.literal_eval(post_data['jobpost'])       
        
        company = CompanyProfile.objects.get(company_name = jobpost['company'])
        jobPosting.job_title = jobpost['title']
        jobPosting.ref_code = jobpost['code']
        jobPosting.company = company
        jobPosting.summary = jobpost['summary']
        document = request.FILES.get('job_details_pdf', '')
        if document:
            jobPosting.document = document
        if jobpost['salary']:
            jobPosting.salary = jobpost['salary']
        jobPosting.currency = jobpost['currency']    
        jobPosting.skills = jobpost['skills']
        jobPosting.industry = jobpost['industry']
        jobPosting.job_location = jobpost['location']
        jobPosting.education_req = jobpost['requirement']
        jobPosting.function = jobpost['category']
        jobPosting.func_role = jobpost['role']
        jobPosting.specialization = jobpost['specialisation']
        jobPosting.nationality = jobpost['nationality']

        if jobpost['last_date']:
            jobPosting.last_date  = datetime.strptime(jobpost['last_date'], '%d/%m/%Y')
        jobPosting.name = jobpost['name']
        jobPosting.phone = jobpost['phone']
        jobPosting.mail_id = jobpost['email']
        jobPosting.description = jobpost['profile']
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
        alljobs = Job.objects.all()
        jobs = Job.objects.filter(recruiter=current_user)
        context = {
          'jobs': jobs,
          'alljobs': alljobs,
          'base_template': 'dashboard.html' if request.user.is_superuser else 'employer_dashboard.html'
        }
        return render(request, 'posted_jobs.html', context)

class DeleteJob(View):

    def get(self, request, *args, **kwargs):

        try:
            job = Job.objects.get(id = kwargs['job_id'])
            job.delete()
            current_user = request.user
            
            jobs = Job.objects.filter(recruiter=current_user)
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
            recruiter = Recruiter.objects.get(user=current_user)
            recruiter.job_count = recruiter.job_count + 1
            recruiter.save()
            alljobs = Job.objects.all()
            jobs = Job.objects.filter(recruiter=current_user)
        except Exception as ex:
            print str(ex)
            jobs = []
        context = {
          'jobs': jobs,
          'alljobs': alljobs,
          'message': 'Published', 
        }

        return HttpResponseRedirect(reverse('posted_jobs'))

class EditPostJobsView(View):

    def get(self, request, *args, **kwargs):
        
        job_id = kwargs['job_id']

        context = {
            'job_id':job_id,
        }
        print job_id
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

        document = request.FILES.get('job_details_pdf', '')
        if document:
            jobPosting.document = document
        if jobpost['salary']:
            jobPosting.salary = jobpost['salary']
        jobPosting.currency = jobpost['currency'] 
        jobPosting.skills = jobpost['skills']
        jobPosting.industry = jobpost['industry']
        jobPosting.job_location = jobpost['location']
        jobPosting.function = jobpost['category']
        jobPosting.func_role = jobpost['role']
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
            jobPosting.last_date  = datetime.strptime(jobpost['last_date'], '%d/%m/%Y')
            print jobPosting.last_date
        jobPosting.save()
        res = {
            'id' : jobPosting.id,
        } 
        response = simplejson.dumps(res)
        status_code = 200
        return HttpResponse(response, status = status_code, mimetype="application/json")

class JobDetailsView(View):
    
    def get(self, request, *args, **kwargs):
        
        job = Job.objects.get(id=kwargs['job_id'])
        alljobs = Job.objects.all()
        context = {
           'job' : job, 
           'alljobs': alljobs,
        }
        if request.is_ajax():
            ctx_jobpost = []
            ctx_jobpost.append({
                'title': job.job_title if job.job_title else '',
                'code': job.ref_code if job.ref_code else '',
                'company_name': job.company.company_name if job.company else '',
                'summary': job.summary if job.summary else '',            
                'details': job.document.name if job.document else '', 
                'salary' : job.salary if job.salary else '',                
                'currency': job.currency if job.currency else '',
                'skills': job.skills if job.skills else '',
                'min':job.exp_req_min if job.exp_req_min else 0,
                'max':job.exp_req_max if job.exp_req_max else 0,
                'location':job.job_location if job.job_location else '',
                'industry':job.industry if job.industry else '',
                'category': job.function if job.function else '',  
                'role': job.func_role if job.func_role else '',          
                'requirement': job.education_req if job.education_req else '',
                'specialisation': job.specialization if job.specialization else '',
                'nationality': job.nationality if job.nationality else '',
                'last_date': job.last_date.strftime('%d/%m/%Y') if job.last_date else '',
                'name': job.name if job.name else '',
                'phone': job.phone if job.phone else '',
                'email': job.mail_id if job.mail_id else '',
                'profile':job.description if job.description else '', 
                'post_date': job.posting_date.strftime('%d/%m/%Y') if job.posting_date else '', 
            })
            
            res = {
                'jobpost': ctx_jobpost,
            }
            print ctx_jobpost
            status_code = 200
            response = simplejson.dumps(res)
            
            return HttpResponse(response, status=status_code, mimetype='application/json')
        return render(request, 'posted_jobs.html', context)


class SearchCandidatesView(View):
    def get(self, request, *args, **kwargs):
        if request.is_ajax():            
            industry = request.GET.get('industry')
            functions = request.GET.get('functions')
            months = request.GET.get('months')
            years = request.GET.get('years')
            skills = request.GET.get('skills')
            basic_edu = request.GET.get('basic_edu')
            basic_specialization = request.GET.get('basic_specialization')
            jobseekers_list = []
            if months == "":
                months = 0
            if years == "":
                years = 0
            q_list = []
            print functions, basic_edu,industry,skills,years,months,basic_specialization
            if industry != "":
                print 'curr_industry'
                q_list.append(Q(employment__curr_industry__icontains = industry))
            if functions:
                print 'functions'
                q_list.append(Q(employment__function__icontains = functions))
            if skills:
                print 'skills'
                q_list.append(Q(employment__skills__icontains = skills))
            
            if basic_edu and years and months:
                print 'basic_edu'
                q_list.append(Q(Q(education__basic_edu = basic_edu), 
                              Q(employment__exp_mnths=int(months)),
                              Q(employment__exp_yrs=int(years))))
            if basic_specialization:
                print 'basic_specialization'
                q_list.append(Q(education__basic_edu_specialization__icontains = basic_specialization))
            print q_list
            jobseekers = Jobseeker.objects.filter(reduce(operator.or_, q_list)).order_by('-id')
            for jobseeker in jobseekers:
                jobseekers_list.append({
                    'id': jobseeker.id,
                    'first_name': jobseeker.user.first_name,
                    'last_name': jobseeker.user.last_name,
                    'email': jobseeker.user.username,
                    'education': jobseeker.education.basic_edu,
                    'specialization': jobseeker.education.basic_edu_specialization,
                    'exp_yrs': jobseeker.employment.exp_yrs,
                    'exp_mnths': jobseeker.employment.exp_mnths,
                    'skills': jobseeker.employment.skills,
                    'functional_area': jobseeker.employment.function if jobseeker.employment.function else '',
                    'industry': jobseeker.employment.curr_industry if jobseeker.employment.curr_industry else '',
                    })
            res = {
                'result': 'ok',
                'candidates_data': jobseekers_list,
            }
            status_code = 200
            response = simplejson.dumps(res)
            return HttpResponse(response, status=status_code, mimetype='application/json')
        return render(request, 'search_candidates.html', {
            'base_template': 'dashboard.html' if request.user.is_superuser else 'employer_dashboard.html'
        }) 


class ViewApplicants(View):

    def get(self, request, *args, **kwargs):
        job_id =kwargs['job_id']
        job = Job.objects.get(id=job_id)
        jobseekers = Jobseeker.objects.filter(applied_jobs=job)
        jobseekers_list = Jobseeker.objects.filter(applied_jobs=job)
        paginator = Paginator(jobseekers_list, 20) # Show 25 contacts per page

        page = request.GET.get('page')
        try:
            jobseekers = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            jobseekers = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            jobseekers = paginator.page(paginator.num_pages)
        context = {
            'job': job,
            'jobseekers':jobseekers,
        }

        return render(request, 'applicants.html', context)


class AdminRequest(View):

    def post(self, request, *args, **kwargs):

        jobseeker_id = kwargs['jobseeker_id']
        jobseeker = Jobseeker.objects.get(id=jobseeker_id)
        current_user =request.user
        user = User.objects.get(is_superuser=True)
        recruiter = Recruiter.objects.get(user=current_user)

        request_send  = RequestSend()
        request_send.jobseeker = jobseeker
        request_send.recruiter = recruiter
        request_send.save()
        email_to = user.email
        subject = "Requesting Contact details "
        message = "send contact details of " + str(jobseeker.user.email) + " to " + str(current_user)
        from_email = settings.DEFAULT_FROM_EMAIL 
        
        send_mail(subject, message, from_email,[email_to])
        
        return HttpResponseRedirect(reverse('posted_jobs'))

class Inbox(View):

    def get(self, request, *args, **kwargs):

        replies = Reply.objects.filter(request__recruiter__user = request.user)
        re = Reply.objects.filter(request__recruiter__user = request.user, is_new=True).update(is_new=False)
        paginator = Paginator(replies, 20) # Show 25 contacts per page
        print replies
        page = request.GET.get('page')
        try:
            replies = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            replies = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            replies = paginator.page(paginator.num_pages)
        context = {
            'replies':replies,
        }
        return render(request, 'inbox.html', context)


class DeleteInbox(View):

    def get(self, request, *args, **kwargs):

        reply_id = kwargs['reply_id']
        reply = Reply.objects.get(id=reply_id)
        reply.is_delete = True
        reply.save()

        return render(request, 'inbox.html', {})

class ActivityLog(View):

    def get(self, request, *args, **kwargs):
        
        
        recruiter = request.user
        last_login = User.objects.get(email=recruiter).last_login
        posted_jobs = Job.objects.filter(recruiter=recruiter)
        context={
            'posted_jobs':posted_jobs,
            'last_login':last_login,
        }
        return render(request, 'employer_activity_log.html',context)
