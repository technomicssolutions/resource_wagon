
from django.db import models
from django.contrib.auth.models import User


from web.models import (COUNTRY_CHOICES, BASIC_EDU, \
	MASTERS_EDU, MARITAL_STATUS, NATIONALITY, GENDER, YEARS, MONTHS, INDUSTRY, \
	FUNCTIONS, Job, EDUCATION_REQUIRED,CURRENCY)



class CompanyProfile(models.Model):

    company_name = models.CharField('Company Name', max_length=200, null=True, blank=True)
    industry_type = models.CharField('Industry Type', max_length=200, choices=INDUSTRY)
    description = models.TextField('Description', null=True, blank=True)
    company_profile  = models.FileField('Company Profile', upload_to = "uploads/company_profile/")

    def __unicode__(self):
        return self.company_name

    class Meta:

        verbose_name = 'CompanyProfile'
        verbose_name_plural = 'CompanyProfile'

class Recruiter(models.Model):
    
    user = models.ForeignKey(User)
    country = models.CharField('Country', null=True, blank=True, max_length=200, choices=COUNTRY_CHOICES)
    city = models.CharField('City', null=True, blank=True, max_length=200)
    mobile = models.CharField ('Mobile', max_length=20)
    land_num = models.CharField('Land Phone', blank=True, max_length=20)
    company = models.ForeignKey(CompanyProfile, null=True, blank=True)

    def __unicode__(self):
        return self.user.username

    class Meta:
        verbose_name = 'RecruiterProfile'
        verbose_name_plural = 'RecruiterProfile'

class Job(models.Model):

    recruiter = models.ForeignKey(Recruiter)
    company = models.ForeignKey(CompanyProfile, null=True, blank=True)
    job_title = models.CharField('Job Title', max_length=50)
    ref_code = models.CharField('Ref Code', max_length=15, null=True, blank=True)
    summary = models.CharField('Summary', max_length=500)
    document = models.FileField (upload_to = "uploads/doc/", null=True, blank=True)
    skills = models.CharField('Skills Required', null=True, blank=True, max_length=50)
    order = models.IntegerField('Order', default=0)
    industry = models.CharField('Industry', max_length=70, choices=INDUSTRY)
    job_location = models.CharField('Job Location', max_length=50, choices=COUNTRY_CHOICES)
    function = models.CharField('Function', max_length=70, choices=FUNCTIONS)
    education_req = models.CharField('Education Required', max_length=70, choices=EDUCATION_REQUIRED)
    specialization = models.CharField('Specialization', max_length=70, null=True, blank=True)
    nationality = models.CharField('Nationality', max_length=70, null=True, blank=True, choices=NATIONALITY)
    name = models.CharField('Name', max_length=50)
    phone = models.CharField('Phone', max_length=50,null=True, blank=True)
    mail_id = models.CharField('Email Id', max_length=70)
    posting_date = models.DateField('Posting Date', null=True, blank=True)
    last_date = models.DateField('Last Date', null=True, blank=True)
    exp_req_min = models.IntegerField('Experience Required Min', null=True, blank=True, choices=YEARS)
    exp_req_max = models.IntegerField('Experience Required Max', null=True, blank=True, choices=YEARS)
    is_featured = models.BooleanField('Is Featured', default=False)
    description = models.TextField('Description', null=True, blank=True)
    is_publish = models.BooleanField('Publish', default=False)
    salary = models.IntegerField('Salary', null=True, blank=True)
    currency = models.CharField('Currency', max_length=30, null=True, blank=True, choices=CURRENCY)

    def __unicode__(self):
        return self.job_title

    class Meta:

        verbose_name = 'JobPosting'
        verbose_name_plural = 'JobPosting'