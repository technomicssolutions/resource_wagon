
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

