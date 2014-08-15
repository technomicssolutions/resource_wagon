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
from employer.models import CompanyProfile

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
        p.drawString(0, y , report_heading)
        p.setFontSize(15)
        p = header(p, y)
        p.drawString(0, y - 80, "Personal Details")
        p.setFontSize(13)
        p.drawString(20, y - 100, "Gender :")
        p.drawString(80, y - 100, jobseeker.gender)
        p.drawString(20, y - 130, "Date Of Birth :")
        p.drawString(110, y - 130, jobseeker.dob.strftime('%d/%m/%y'))
        p.drawString(20, y - 160, "Marital Status :")
        p.drawString(110, y - 160, jobseeker.marital_status)
        p.drawString(20, y - 190, "Nationality :")
        p.drawString(100, y - 190, jobseeker.nationality)
        p.drawString(20, y - 210, "Country :")
        p.drawString(80, y - 210, jobseeker.country)
        p.drawString(20, y - 240, "City :")
        p.drawString(60, y - 240, jobseeker.city)
        p.setFontSize(15)
        p = header(p, y)
        p.drawString(0, y - 280, "Educational Details")
        p.setFontSize(13)
        p.drawString(20, y - 300, "Basic Education :")
        p.drawString(130, y - 300, jobseeker.education.basic_edu)
        p.drawString(350,y-300,jobseeker.education.basic_edu_specialization)
        p.drawString(20, y - 315, "Passed Out Year :")
        p.drawString(140,y-315,str(jobseeker.education.pass_year_basic))
        if jobseeker.education.masters:
            p.drawString(20, y - 350, "Masters Education :")
            p.drawString(150, y - 350, jobseeker.education.masters)
            p.drawString(350,y-350,jobseeker.education.masters_specialization)
            p.drawString(20, y - 365, "Passed Out Year :")
            p.drawString(140,y-365,str(jobseeker.education.pass_year_masters))
        y1 = y - 385
        if jobseeker.education.doctrate:
            p.drawString(20,y-385,"Doctrates:")
            for doctrate in jobseeker.education.doctrate.all():
                y1 = y1 - 30
                p.drawString(150,y1,doctrate)
        p.setFontSize(15)
        p = header(p, y)
        p.drawString(0,y-420, "Techinical Skills")
        p.setFontSize(13)
        p.drawString(20,y-440,jobseeker.employment.skills)
        p.setFontSize(15)
        p = header(p, y)
        p.drawString(0,y-460,"Employment Details")
        p.setFontSize(13)
        p.drawString(20,y-480,"Total Experience:")
        p.drawString(130,y-480 ,str(jobseeker.employment.exp_yrs)+"Year")
        p.drawString(170,y-480, str(jobseeker.employment.exp_mnths)+"Month")
        if jobseeker.employment.curr_industry:
            p.drawString(20,y-500,"Current Industry:")
            p.drawString(130,y-500,jobseeker.employment.curr_industry)
        p.drawString(20,y-520,"Funtional Area:")
        p.drawString(150,y-520,jobseeker.employment.function)
        if jobseeker.employment.designation:
            p.drawString(20,y-540,"Current Designation:")
            p.drawString(150,y-540,jobseeker.employment.designation)
        y1 = y - 560
        if jobseeker.employment.previous_employer:
            p.drawString(20,y-560,"Previous Employers:")
            for employer in jobseeker.employment.previous_employer.all():
                y1 = y1 - 10
                p.drawString(150,y1,str(employer))
        p.setFontSize(15)
        
        y1 = y - 600
        if jobseeker.prefered_locations:
            p.drawString(0,y-600,"Preffered Location:")
            for location in jobseeker.prefered_locations.all():
                y1 = y1 - 30
                p.setFontSize(13)
                p.drawString(150,y1,str(location))
        p.setFontSize(15)
        
        y1 = y - 650
        if jobseeker.prefered_companies:
            p.drawString(0,y-650,"Preffered Company:")
            for company in jobseeker.prefered_companies.all():
                y1 = y1 - 30
                p.setFontSize(13)
                p.drawString(150,y1,str(company))
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

            p.showPage()
            p.save()
            return response                
        else:
            return render(request, 'reports.html', {}) 