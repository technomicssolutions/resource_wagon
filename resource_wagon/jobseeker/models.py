
from django.db import models
from django.contrib.auth.models import User

from web.models import (COUNTRY_CHOICES, BASIC_EDU, \
	MASTERS_EDU, MARITAL_STATUS, NATIONALITY, GENDER, YEARS, MONTHS, INDUSTRY, \
	FUNCTIONS, Job, MASTERS_SPEC, BASIC_SPEC,CURRENCY)

class PreviousEmployer(models.Model):
    previous_employer_name = models.CharField('Employer name', max_length=100, null=True, blank=True)

    def __unicode__(self):

        return self.previous_employer_name

class Doctorate(models.Model):
    doctorate_name = models.CharField('Doctorate', null=True, blank=True, max_length=100)

    def __unicode__(self):
        return self.doctorate_name

class Employment(models.Model):

    exp_yrs = models.IntegerField('Experience in Years',null=True, blank=True, choices=YEARS)
    exp_mnths = models.IntegerField('Experience in Months',null=True, blank=True, choices=MONTHS)
    salary = models.IntegerField('Salary', null=True, blank=True)
    designation = models.CharField('Designation', null=True, blank=True, max_length=200)
    currency = models.CharField('Currency',null=True, blank=True, max_length=200, choices=CURRENCY)
    skills = models.TextField('Key Skills', null=True, blank=True)
    curr_industry = models.CharField('Current Industry', null=True, blank=True, max_length=200, choices=INDUSTRY)
    function = models.CharField('Function', null=True, blank=True, max_length=200, choices=FUNCTIONS)
    previous_employer = models.ManyToManyField(PreviousEmployer, null=True, blank=True)

    def __unicode__(self):
        return str(self.exp_yrs)

    class Meta:

        verbose_name = 'Employment'
        verbose_name_plural = 'Employment'


class Education(models.Model):
    
    basic_edu = models.CharField('Basic Education', max_length=200, choices=BASIC_EDU)
    basic_edu_specialization = models.CharField('Basic Education Specialization', max_length=200, choices=BASIC_SPEC,null=True, blank=True) 
    pass_year_basic = models.IntegerField('Basic Pass Year', null=True, blank=True)
    masters = models.CharField('Masters', null=True, blank=True, max_length=200, choices=MASTERS_EDU)
    masters_specialization = models.CharField('Masters Specialization', null=True, blank=True, max_length=200, choices=MASTERS_SPEC)
    pass_year_masters = models.IntegerField('Masters pass Year', null=True, blank=True)
    doctrate = models.ManyToManyField(Doctorate, null=True, blank=True)
    resume_title = models.CharField('Resume Title', max_length=200)
    resume = models.FileField(upload_to = "uploads/resumes/", null=True, blank=True)
    resume_text = models.TextField('Resume Text', null=True, blank=True)
    # show_resume = models.BooleanField("Show Resume", default = True)
    

    def __unicode__(self):
        return str(self.basic_edu)

    class Meta:

        verbose_name = 'Education'
        verbose_name_plural = 'Education'





class Jobseeker(models.Model):
    
    user = models.ForeignKey(User)
    country = models.CharField('Country', null=True, blank=True, max_length=200, choices=COUNTRY_CHOICES)
    city = models.CharField('City', null=True, blank=True, max_length=200)
    mobile = models.CharField ('Mobile', max_length=20)
    land_num = models.CharField('Land Phone', blank=True, max_length=20)
    gender = models.CharField('Gender', max_length=7, choices=GENDER)
    nationality = models.CharField('Nationality', max_length=200, choices=NATIONALITY)
    alt_mail = models.CharField('Alternate Email Id', null=True, blank=True, max_length=200)
    photo = models.FileField( upload_to = "uploads/photos/", null=True, blank=True)
    marital_status = models.CharField('Marital Status', null=True, blank=True, max_length=20, choices=MARITAL_STATUS)
    religion = models.CharField('Religion', null=True, blank=True, max_length=20)
    dob = models.DateField('DOB', null=True, blank=True)
    age = models.IntegerField('Age', null=True, blank=True)
    education = models.ForeignKey(Education, null=True, blank=True)
    employment = models.ForeignKey(Employment, null=True, blank=True)
    applied_jobs  = models.ManyToManyField(Job)

    def __unicode__(self):
        return self.user.username

    class Meta:
        verbose_name = 'JobSeekerProfile'
        verbose_name_plural = 'JobSeekerProfile'

