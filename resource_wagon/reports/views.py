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
        p.drawString(0, y - 60, report_heading)
        p.setFontSize(15)
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
        p.drawString(0,y-420, "Techinical Skills")
        p.setFontSize(13)
        p.drawString(20,y-440,jobseeker.employment.skills)
        p.setFontSize(15)
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