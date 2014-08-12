
from django.contrib import admin

from employer.models import CompanyProfile, Recruiter, Job

admin.site.register(CompanyProfile)
admin.site.register(Recruiter)
admin.site.register(Job)