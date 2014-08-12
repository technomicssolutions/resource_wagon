
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from employer.views import EmployerRegistration, SaveEmployer,EmployerView, EditEmployer, PostJobsView,PostedJobsView,DeleteJob,PublishJob,EditPostJobsView

urlpatterns = patterns('',
    url(r'^registration/$', EmployerRegistration.as_view(), name="employer_registration"),
    url(r'^save_recruiter_details/$', SaveEmployer.as_view(), name="save_recruiter_details"),
    url(r'^employer_profile/$', EmployerView.as_view(), name="employer_profile"),
    url(r'^edit_recruiter_profile/(?P<employer_id>\d+)/$', login_required(EditEmployer.as_view()), name="edit_recruiter_profile"),
    url(r'^post_job/$',login_required(PostJobsView.as_view()), name='postjobs'),
    url(r'^posted_jobs/$', login_required(PostedJobsView.as_view()), name='posted_jobs'),
    url(r'^delete/(?P<job_id>\d+)/$', DeleteJob.as_view(), name='delete_job'),
    url(r'^publish/(?P<job_id>\d+)/$', PublishJob.as_view(), name='publish_job'),
    url(r'^edit/(?P<job_id>\d+)/$',login_required(EditPostJobsView.as_view()), name='post_jobs_edit'),
)