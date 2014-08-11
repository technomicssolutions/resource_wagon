
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from employer.views import EmployerRegistration, SaveEmployer,EmployerView

urlpatterns = patterns('',
    url(r'^registration/$', EmployerRegistration.as_view(), name="employer_registration"),
    url(r'^save_recruiter_details/$', SaveEmployer.as_view(), name="save_recruiter_details"),
    url(r'^employer_profile/$', login_required(EmployerView.as_view()), name="employer_profile"),

)