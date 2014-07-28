
from django.conf.urls import patterns, url

from employer.views import EmployerRegistration

urlpatterns = patterns('',
    url(r'^registration/$', EmployerRegistration.as_view(), name="employer_registration"),
)