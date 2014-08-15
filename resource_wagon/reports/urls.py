from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from reports.views import ApplicantReport, ReportsView

urlpatterns = patterns('',
	url(r'^applicant_resume/(?P<jobseeker_id>\d+)/$',ApplicantReport.as_view(), name='applicant_resume'),
	url(r'^reports/$',ReportsView.as_view(), name='reports'),

)