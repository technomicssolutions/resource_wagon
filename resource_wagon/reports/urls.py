from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required
from reports.views import ApplicantReport, ReportsView

urlpatterns = patterns('',
	url(r'^applicant_resume/(?P<jobseeker_id>\d+)/$', login_required(ApplicantReport.as_view()), name='applicant_resume'),
	url(r'^reports/$', login_required(ReportsView.as_view()), name='reports'),

)