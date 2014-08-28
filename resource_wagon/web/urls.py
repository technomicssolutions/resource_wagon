
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from web.views import (Login, Logout, Home, ResetPassword, RequestView, ReplyEmployer, \
	DeleteRequest, ForgotPassword, Aboutus, Dashboard, Companies, Company , PremiumEmployer, \
    MissionStatement, ResourcesWagon, WagonDrivers, CandidatePreparation, CompetencyAnalysis, RecruitmentDivisions, DeleteEmployer, DeleteJobseeker)

urlpatterns = patterns('',
    url(r'login/$', Login.as_view(), name="login"),
    url(r'logout/$', Logout.as_view(), name="logout"),
    url(r'^$', Home.as_view(), name="home"),
    url(r'^admin_dashboard/$', login_required(Dashboard.as_view(), login_url="/login/"), name="admin_dashboard"),
    url(r'^forgot_password/$', login_required(ForgotPassword.as_view(), login_url="/login/"), name='forgot_password'),
    url(r'^reset_password/(?P<user_id>\d+)/$', login_required(ResetPassword.as_view(), login_url="/login/"), name="reset_password"),
    url(r'^request/$', login_required(RequestView.as_view(), login_url="/login/"), name="request"),
    url(r'^reply/(?P<request_id>\d+)/$', login_required(ReplyEmployer.as_view(), login_url="/login/"), name="reply"),
    url(r'^delete_request/(?P<request_id>\d+)/$', login_required(DeleteRequest.as_view(), login_url="/login/"), name='delete_request'),
    url(r'^aboutus/$', Aboutus.as_view(), name='aboutus'),
    url(r'^aboutus/mission_statement/$', MissionStatement.as_view(), name='mission_statement'),
    url(r'^aboutus/resources_wagon/$', ResourcesWagon.as_view(), name='resources_wagon'),
    url(r'^aboutus/wagon_drivers/$', WagonDrivers.as_view(), name='wagon_drivers'),
	url(r'^employers/recruitment_divisions/$', RecruitmentDivisions.as_view(), name='recruitment_divisions'),
	url(r'^employers/competency_analysis/$', CompetencyAnalysis.as_view(), name='competency_analysis'),
	url(r'^candidates/candiadte_preparation/$', CandidatePreparation.as_view(), name='candidate_preparation'),
    url(r'^company/(?P<company_id>\d+)/$', Company.as_view(), name='company'),
    url(r'^companies/$', Companies.as_view(), name='companies'),
    url(r'^delete_employer/(?P<recruiter_id>\d+)/$', DeleteEmployer.as_view(), name='delete_employer'),
    url(r'^delete_jobseeker/(?P<jobseeker_id>\d+)/$', DeleteJobseeker.as_view(), name='delete_jobseeker'),
    url(r'^save_premium_employer/$', PremiumEmployer.as_view(), name='save_premium_employer'),
)