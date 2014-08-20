# Create your views here.

from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.lib.colors import green, black, red, gray
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from django.shortcuts import render
from django.views.generic.base import View
from django.contrib.auth.models import User
from django.http import HttpResponse

from jobseeker.models import Jobseeker,Education,Employment
from web.models import Job
from employer.models import CompanyProfile, Recruiter

def header(canvas, y):

    canvas.setFont("Helvetica", 30)  
    canvas.setFillColor(black)

    return canvas

class ApplicantReport(View):
    
    def get(self, request, *args, **kwargs):    
        
        status_code = 200
        response = HttpResponse(content_type='application/pdf')
        p = canvas.Canvas(response, pagesize=(1000, 1250))
        y = 1150
        p.setFontSize(15)
        p = header(p, y)

        jobseeker_id =kwargs['jobseeker_id']
        print jobseeker_id
        jobseeker = Jobseeker.objects.get(id=jobseeker_id)
        print jobseeker
        report_heading = jobseeker.user.first_name + jobseeker.user.last_name 
        p.drawString(400, y , report_heading)
        p.setFontSize(15)
        # p = header(p, y)

        p.drawString(60, y - 80, "Personal Details")
        p.setFontSize(10)
        p.drawString(80, y - 100, "Gender :")
        p.drawString(200, y - 100, jobseeker.gender)
        p.drawString(80, y - 130, "Date Of Birth :")
        p.drawString(200, y - 130, jobseeker.dob.strftime('%d/%m/%y'))
        p.drawString(80, y - 160, "Marital Status :")
        p.drawString(200, y - 160, jobseeker.marital_status)
        p.drawString(80, y - 190, "Nationality :")
        p.drawString(200, y - 190, jobseeker.nationality)
        p.drawString(80, y - 210, "Country :")
        p.drawString(200, y - 210, jobseeker.country)
        p.drawString(80, y - 240, "City :")
        p.drawString(200, y - 240, jobseeker.city)
        p.setFontSize(15)
        # p = header(p, y)
        p.drawString(60, y - 280, "Educational Details")
        p.setFontSize(10)
        p.drawString(80, y - 300, "Basic Education :")
        p.drawString(180, y - 300, jobseeker.education.basic_edu)
        p.drawString(350,y-300,jobseeker.education.basic_edu_specialization)
        p.drawString(80, y - 330, "Passed Out Year :")
        p.drawString(180,y-330,str(jobseeker.education.pass_year_basic))
        if jobseeker.education.masters:
            p.drawString(550, y - 300, "Masters Education :")
            p.drawString(650, y - 300, jobseeker.education.masters)
            p.drawString(850,y-300,jobseeker.education.masters_specialization)
            p.drawString(300, y - 330, "Passed Out Year :")
            p.drawString(400,y-330,str(jobseeker.education.pass_year_masters))
        y1 = y - 360
        if jobseeker.education.doctrate.all():
            p.drawString(80,y1,"Doctrates:")
            for doctrate in jobseeker.education.doctrate.all():
                y1 = y1 - 30
                p.drawString(180,y1,doctrate)
        p.setFontSize(15)
        # p = header(p, y)
        p.drawString(60,y-400, "Techinical Skills:")
        p.setFontSize(10)
        p.drawString(200,y-400,jobseeker.employment.skills)
        p.setFontSize(15)
        # p = header(p, y)
        p.drawString(60,y-460,"Employment Details")
        p.setFontSize(10)
        p.drawString(80,y-480,"Total Experience:")
        p.drawString(180,y-480 ,str(jobseeker.employment.exp_yrs)+"Year")
        p.drawString(210,y-480, str(jobseeker.employment.exp_mnths)+"Month")
        if jobseeker.employment.curr_industry:
            p.drawString(300,y-480,"Current Industry:")
            p.drawString(400,y-480,jobseeker.employment.curr_industry)
        if jobseeker.employment.function:
            p.drawString(80,y-500,"Funtional Area:")
            p.drawString(180,y-500,jobseeker.employment.function)
        if jobseeker.employment.designation:
            p.drawString(250,y-500,"Current Designation:")
            p.drawString(350,y-500,jobseeker.employment.designation)
        y1 = y - 520
        if jobseeker.employment.previous_employer.all():
            p.drawString(80,y1,"Previous Employers:")
            for employer in jobseeker.employment.previous_employer.all():
                y1 = y1 - 10
                p.drawString(150,y1,str(employer))
        p.setFontSize(15)
        
        y1 = y - 550
        if jobseeker.prefered_locations:
            p.drawString(60,y1,"Preffered Location:")
            for location in jobseeker.prefered_locations.all():
                y1 = y1 - 30
                p.setFontSize(10)
                p.drawString(180,y1,str(location))
        p.setFontSize(15)
        
        y1 = y - 600
        if jobseeker.prefered_companies:
            p.drawString(60,y1,"Preffered Company:")
            for company in jobseeker.prefered_companies.all():
                y1 = y1 - 30
                p.setFontSize(10)
                p.drawString(180,y1,str(company))
        p.showPage()
        p.save()
        return response

class ReportsView(View):

    def get(self, request, *args, **kwargs): 
        if request.GET.get('report_type'):
            report_type = request.GET.get('report_type')
            if report_type == '1':
                domain = request.GET.get('domain')
                jobs = Job.objects.filter(function=domain)
                status_code = 200
                response = HttpResponse(content_type='application/pdf')
                p = canvas.Canvas(response, pagesize=(1000, 1250))
                y = 1150
                p.setFontSize(15)
                p = header(p, y)
                report_heading = "Job posted in "+domain
                p.drawString(320, y , report_heading)
                p.setFontSize(15)
                p = header(p, y)
                p.drawString(60, y - 60, "Employer Details")
                p.setFontSize(13)
                count = 1
                l = 60
                m = y - 120
                for job in jobs:   
                    p.drawString(l, m, "Employer #"+str(count))          
                    p.drawString(l+20, m-20, "Name :")
                    p.drawString(l+140, m-20, job.company.company_name)
                    p.drawString(l+20, m-40, "Date Posted :")
                    p.drawString(l+140, m-40, str(job.posting_date))
                    p.drawString(l+20, m-60, "Job Title :")
                    p.drawString(l+140, m-60, str(job.job_title))
                    p.drawString(l+20, m-80, "Eligibility :")
                    p.drawString(l+140, m-80, str(job.education_req) + str(job.specialization))
                    p.drawString(l+20, m-100, "Experience Req :")
                    p.drawString(l+140, m-100, str(job.exp_req_min)+"-"+str(job.exp_req_max)+" years")
                    p.drawString(l+20, m-120, "Job Location :")
                    p.drawString(l+140, m-120, str(job.job_location))
                    p.drawString(l+20, m-140, "Salary :")
                    p.drawString(l+140, m-140, str(job.salary))

                    p.drawString(l+500, m-20, "Contact Number :")
                    p.drawString(l+620, m-20, str(job.phone))
                    p.drawString(l+500, m-40, "Contact Email :")
                    p.drawString(l+620, m-40, str(job.mail_id))
                
                    count = count+1
                    m = m - 200
                    if m <= 270:
                        m = y - 50
                        p.showPage()
            if report_type == '2':
                employer = request.GET.get('employer')
                company = CompanyProfile.objects.get(id=employer)
                jobs = company.job_set.all()
                status_code = 200
                response = HttpResponse(content_type='application/pdf')
                p = canvas.Canvas(response, pagesize=(1000, 1250))
                y = 1150
                p.setFontSize(15)
                p = header(p, y)
                report_heading = "Job posted by "+company.company_name
                p.drawString(320, y , report_heading)
                p.setFontSize(15)
                p = header(p, y)
                p.drawString(60, y - 60, "Job Details")
                p.setFontSize(13)
                count = 1
                l = 60
                m = y - 120
                for job in jobs:   
                    p.drawString(l, m, "Job#"+str(count))          
                    p.drawString(l+20, m-20, "Job Title :")
                    p.drawString(l+140, m-20, str(job.job_title))
                    p.drawString(l+20, m-40, "Date Posted :")
                    p.drawString(l+140, m-40, str(job.posting_date))
                    p.drawString(l+20, m-60, "Eligibility :")
                    p.drawString(l+140, m-60, str(job.education_req) + str(job.specialization))
                    p.drawString(l+20, m-80, "Experience Req :")
                    p.drawString(l+140, m-80, str(job.exp_req_min)+"-"+str(job.exp_req_max)+" years")
                    p.drawString(l+20, m-100, "Job Location :")
                    p.drawString(l+140, m-100, str(job.job_location))
                    p.drawString(l+20, m-120, "Salary :")
                    p.drawString(l+140, m-120, str(job.salary))

                    p.drawString(l+500, m-20, "Contact Number :")
                    p.drawString(l+620, m-20, str(job.phone))
                    p.drawString(l+500, m-40, "Contact Email :")
                    p.drawString(l+620, m-40, str(job.mail_id))
                
                    count = count+1
                    m = m - 200
                    if m <= 270:
                        m = y - 50
                        p.showPage()
            if report_type == '3':
                country = request.GET.get('country')
                jobs = Job.objects.filter(job_location=country)
                status_code = 200
                response = HttpResponse(content_type='application/pdf')
                p = canvas.Canvas(response, pagesize=(1000, 1250))
                y = 1150
                p.setFontSize(15)
                p = header(p, y)
                report_heading = "Jobs in "+country
                p.drawString(320, y , report_heading)
                p.setFontSize(15)
                p = header(p, y)
                p.drawString(60, y - 60, "Job Details")
                p.setFontSize(13)
                count = 1
                l = 60
                m = y - 120
                for job in jobs:   
                    p.drawString(l, m, "Employer #"+str(count))          
                    p.drawString(l+20, m-20, "Name :")
                    p.drawString(l+140, m-20, job.company.company_name)
                    p.drawString(l+20, m-40, "Date Posted :")
                    p.drawString(l+140, m-40, str(job.posting_date))
                    p.drawString(l+20, m-60, "Job Title :")
                    p.drawString(l+140, m-60, str(job.job_title))
                    p.drawString(l+20, m-80, "Eligibility :")
                    p.drawString(l+140, m-80, str(job.education_req) + str(job.specialization))
                    p.drawString(l+20, m-100, "Experience Req :")
                    p.drawString(l+140, m-100, str(job.exp_req_min)+"-"+str(job.exp_req_max)+" years")
                    p.drawString(l+20, m-120, "Job Location :")
                    p.drawString(l+140, m-120, str(job.job_location))
                    p.drawString(l+20, m-140, "Salary :")
                    p.drawString(l+140, m-140, str(job.salary))

                    p.drawString(l+500, m-20, "Contact Number :")
                    p.drawString(l+620, m-20, str(job.phone))
                    p.drawString(l+500, m-40, "Contact Email :")
                    p.drawString(l+620, m-40, str(job.mail_id))
                
                    count = count+1
                    m = m - 200
                    if m <= 270:
                        m = y - 50
                        p.showPage()
            if report_type == '4':
                jobs = Job.objects.all().order_by('-search_count')[:10];
                status_code = 200
                response = HttpResponse(content_type='application/pdf')
                p = canvas.Canvas(response, pagesize=(1000, 1250))
                y = 1150
                p.setFontSize(15)
                p = header(p, y)
                report_heading = ("Most Searched Jobs")
                p.drawString(320, y , report_heading)
                p.setFontSize(15)
                p = header(p, y)
                p.drawString(60, y - 60, "Job Details")
                p.setFontSize(13)
                count = 1
                l = 60
                m = y - 120
                for job in jobs:   
                    p.drawString(l, m, "Job #"+str(count))      
                    p.drawString(l+20, m-20, "Job Title :")
                    p.drawString(l+140, m-20, str(job.job_title))
                    p.drawString(l+20, m-40, "Company :")
                    p.drawString(l+140, m-40, job.company.company_name)
                    p.drawString(l+20, m-60, "Date Posted :")
                    p.drawString(l+140, m-60, str(job.posting_date))
                    p.drawString(l+20, m-80, "Eligibility :")
                    p.drawString(l+140, m-80, str(job.education_req) + str(job.specialization))
                    p.drawString(l+20, m-100, "Experience Req :")
                    p.drawString(l+140, m-100, str(job.exp_req_min)+"-"+str(job.exp_req_max)+" years")
                    p.drawString(l+20, m-120, "Job Location :")
                    p.drawString(l+140, m-120, str(job.job_location))
                    p.drawString(l+20, m-140, "Salary :")
                    p.drawString(l+140, m-140, str(job.salary))

                    p.drawString(l+500, m-20, "Searched :")
                    p.drawString(l+620, m-20, str(job.search_count)+" times")         
                
                    count = count+1
                    m = m - 200
                    if m <= 270:
                        m = y - 50
                        p.showPage()
            if report_type == '5':
                jobs = Job.objects.all().order_by('-applicants_count')[:10];
                status_code = 200
                response = HttpResponse(content_type='application/pdf')
                p = canvas.Canvas(response, pagesize=(1000, 1250))
                y = 1150
                p.setFontSize(15)
                p = header(p, y)
                report_heading = ("Most Applied Jobs")
                p.drawString(320, y , report_heading)
                p.setFontSize(15)
                p = header(p, y)
                p.drawString(60, y - 60, "Job Details")
                p.setFontSize(13)
                count = 1
                l = 60
                m = y - 120
                for job in jobs:   
                    p.drawString(l, m, "Job #"+str(count))      
                    p.drawString(l+20, m-20, "Job Title :")
                    p.drawString(l+140, m-20, str(job.job_title))
                    p.drawString(l+20, m-40, "Company :")
                    p.drawString(l+140, m-40, job.company.company_name)
                    p.drawString(l+20, m-60, "Date Posted :")
                    p.drawString(l+140, m-60, str(job.posting_date))
                    p.drawString(l+20, m-80, "Eligibility :")
                    p.drawString(l+140, m-80, str(job.education_req) + str(job.specialization))
                    p.drawString(l+20, m-100, "Experience Req :")
                    p.drawString(l+140, m-100, str(job.exp_req_min)+"-"+str(job.exp_req_max)+" years")
                    p.drawString(l+20, m-120, "Job Location :")
                    p.drawString(l+140, m-120, str(job.job_location))
                    p.drawString(l+20, m-140, "Salary :")
                    p.drawString(l+140, m-140, str(job.salary))

                    p.drawString(l+500, m-20, str(job.applicants_count)+" people(s) applied")                       
         
                    count = count+1
                    m = m - 200 
                    if m <= 270:
                        m = y - 50
                        p.showPage()
            if report_type == '6':
                recruiters = Recruiter.objects.all().order_by('-job_count')[:10];
                status_code = 200
                response = HttpResponse(content_type='application/pdf')
                p = canvas.Canvas(response, pagesize=(1000, 1250))
                y = 1150
                p.setFontSize(15)
                p = header(p, y)
                report_heading = ("Companies who posted highest jobs")
                p.drawString(300, y , report_heading)
                p.setFontSize(15)
                p = header(p, y)
                p.drawString(60, y - 60, "Job Details")
                p.setFontSize(13)
                count = 1
                l = 60
                m = y - 120
                for recruiter in recruiters:   
                    p.drawString(l, m, "Recruiter #"+str(count))      
                    p.drawString(l+20, m-20, "Company :")
                    p.drawString(l+140, m-20, recruiter.company.company_name)
                    p.drawString(l+20, m-40, "Industry Type :")
                    p.drawString(l+140, m-40, str(recruiter.company.industry_type))
                    p.drawString(l+20, m-60, "Country :")
                    p.drawString(l+140, m-60, str(recruiter.country))
             
                    p.drawString(l+500, m-20, str(recruiter.job_count)+" job(s) posted")                       
         
                    count = count+1
                    m = m - 100 
                    if m <= 270:
                        m = y - 120
                        p.showPage()
            if report_type == '7':
                job_id = request.GET.get('job_id')
                job = Job.objects.get(id=job_id)
                jobseekers = Jobseeker.objects.filter(applied_jobs=job)
                status_code = 200
                response = HttpResponse(content_type='application/pdf')
                p = canvas.Canvas(response, pagesize=(1000, 1250))
                y = 1150
                p.setFontSize(15)
                p = header(p, y)
                report_heading = ("Candidates applied for "+ job.job_title)
                p.drawString(300, y , report_heading)
                p.setFontSize(15)
                p = header(p, y)
                p.drawString(60, y - 60, "Candidate Details")
                p.setFontSize(13)
                count = 1
                l = 60
                m = y - 120
                for jobseeker in jobseekers:   
                    p.drawString(l, m, "Candidate #"+str(count))      
                    p.drawString(l+20, m-20, "Name :")
                    p.drawString(l+140, m-20, jobseeker.user.first_name+" "+jobseeker.user.last_name)
                    p.drawString(l+20, m-40, "Education")
                    p.drawString(l+140, m-40, str(jobseeker.education))
                    p.drawString(l+20, m-60, "Gender :")
                    p.drawString(l+140, m-60, jobseeker.gender)
                    p.drawString(l+20, m-80, "Country :")
                    p.drawString(l+140, m-80, jobseeker.country)             
           
                    count = count+1
                    m = m - 120 
                    if m <= 270:
                        m = y - 120
                        p.showPage()

            p.showPage()
            p.save()
            return response                
        else:
            return render(request, 'reports.html', {}) 