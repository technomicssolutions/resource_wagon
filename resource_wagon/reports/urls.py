from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from reports.views import ApplicantReport

urlpatterns = patterns('',
	url(r'^applicant_resume/(?P<jobseeker_id>\d+)/$',ApplicantReport.as_view(), name='applicant_resume'),

)