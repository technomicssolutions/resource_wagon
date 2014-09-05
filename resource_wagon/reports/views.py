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

    canvas.setFont("Times-Roman", 30)  
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
        jobseeker = Jobseeker.objects.get(id=jobseeker_id)
        p.setFont('Times-Roman',35)  
        report_heading = jobseeker.user.first_name +" "+ jobseeker.user.last_name 
        p.drawCentredString(500, y , report_heading)
        p.setFontSize(15)
        # p = header(p, y)

        p.drawString(60, y - 70, "Personal Details")
        p.setFont('Times-Roman',13)  
        p.drawString(80, y - 100, "Gender")
        p.drawString(280, y-100, ":")
        p.drawString(300, y - 100, jobseeker.gender)
        p.drawString(80, y - 120, "Date Of Birth")
        p.drawString(280, y-120, ":")
        p.drawString(300, y - 120, jobseeker.dob.strftime('%d/%m/%y'))
        p.drawString(80, y - 140, "Marital Status")
        p.drawString(280, y-140, ":")
        p.drawString(300, y - 140, jobseeker.marital_status)
        p.drawString(80, y - 160, "Nationality")
        p.drawString(280, y-160, ":")
        p.drawString(300, y - 160, jobseeker.nationality)
        p.drawString(80, y - 180, "Country")
        p.drawString(280, y-180, ":")
        p.drawString(300, y - 180, jobseeker.country)
        p.drawString(80, y - 200, "City")
        p.drawString(280, y-200, ":")
        p.drawString(300, y - 200, jobseeker.city)
        p.setFontSize(15)
        # p = header(p, y)
        p.drawString(60, y - 250, "Educational Details")
        p.setFont('Times-Roman',13)  
        p.drawString(80, y - 280, "Basic Education")
        p.drawString(280, y-280, ":")
        p.drawString(300, y - 280, jobseeker.education.basic_edu)
        p.drawString(80, y - 300, "Specialization")
        p.drawString(280, y-300, ":")
        p.drawString(300,y-300,jobseeker.education.basic_edu_specialization)
        p.drawString(80, y - 320, "Passed Out Year")
        p.drawString(280, y-320, ":")
        p.drawString(300,y-320,str(jobseeker.education.pass_year_basic))
        j = y - 320
        if jobseeker.education.masters:
            p.drawString(80, y - 340, "Masters Education")
            p.drawString(280, y - 340, ":")
            p.drawString(300, y - 340, jobseeker.education.masters)
            p.drawString(80, y - 360, "Specialization")
            p.drawString(280, y - 360, ":")
            p.drawString(300,y - 360,jobseeker.education.masters_specialization)
            p.drawString(80, y - 380, "Passed Out Year")
            p.drawString(280, y - 380, ":")
            p.drawString(300,y - 380,str(jobseeker.education.pass_year_masters))
            j = y - 380
        # y1 = y - 360
        if jobseeker.education.doctrate.all():
            p.drawString(80, j - 20,"Doctrates")
            p.drawString(280, j - 20, ":")
            for doctrate in jobseeker.education.doctrate.all():
                #y1 = y1 - 30
                p.drawString(300,j - 20,doctrate.doctorate_name)
                j = j - 20
        p.setFontSize(15)
        p.drawString(60,j - 50, "Techinical Skills")
        p.setFont('Times-Roman',13)
        p.drawString(80, j - 80,jobseeker.employment.skills)
        p.setFontSize(15)
        p.drawString(60, j - 130,"Employment Details")
        p.setFont('Times-Roman',13)
        p.drawString(80, j - 160,"Total Experience")
        p.drawString(280, j - 160, ":")
        p.drawString(300, j - 160,str(jobseeker.employment.exp_yrs)+" Year(s)")
        p.drawString(360, j - 160, str(jobseeker.employment.exp_mnths)+" Month(s)")
        j = j - 160
        if jobseeker.employment.curr_industry:
            p.drawString(80, j - 20 ,"Current Industry")
            p.drawString(280, j - 20, ":")
            p.drawString(300, j - 20 ,jobseeker.employment.curr_industry)
            j = j - 20
        if jobseeker.employment.function:
            p.drawString(80, j - 20,"Funtional Area")
            p.drawString(280, j - 20, ":")
            p.drawString(300, j - 20,jobseeker.employment.function)
            j = j -20
        if jobseeker.employment.designation:
            p.drawString(80, j - 20,"Current Designation")
            p.drawString(280, j - 20, ":")
            p.drawString(300, j - 20,jobseeker.employment.designation)
            j = j - 20
        # y1 = y - 520
        if jobseeker.employment.previous_employer.all():
            p.drawString(80, j - 20,"Previous Employers")
            p.drawString(280, j - 20, ":")
            for employer in jobseeker.employment.previous_employer.all():
                p.drawString(300, j - 20,str(employer.previous_employer_name))
                j = j - 20
        if jobseeker.prefered_locations:
            p.drawString(80, j - 20, "Preffered Location")
            p.drawString(280, j - 20, ":")
            for location in jobseeker.prefered_locations.all():
                p.drawString(300, j - 20 ,str(location.location))
                j = j -20
        if jobseeker.prefered_companies:
            p.drawString(80, j - 20,"Preffered Company")
            p.drawString(280, j - 20, ":")
            for company in jobseeker.prefered_companies.all():
                p.drawString(300, j - 20 ,str(company.company_name))
                j = j -20
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
                jobs = company.job_set.filter(is_publish = True)
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
                report_heading = ("Candidates applied for "+ job.job_title+ " in "+ job.company.company_name)
                p.drawCentredString(500, y , report_heading)
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