
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from employer.views import EmployerRegistration, SaveEmployer,EmployerView, EditEmployer, PostJobsView

urlpatterns = patterns('',
    url(r'^registration/$', EmployerRegistration.as_view(), name="employer_registration"),
    url(r'^save_recruiter_details/$', SaveEmployer.as_view(), name="save_recruiter_details"),
    url(r'^employer_profile/$', EmployerView.as_view(), name="employer_profile"),
    url(r'^edit_recruiter_profile/(?P<employer_id>\d+)/$', login_required(EditEmployer.as_view()), name="edit_recruiter_profile"),
    url(r'^post_job/$',login_required(PostJobsView.as_view()), name='postjobs'),
)