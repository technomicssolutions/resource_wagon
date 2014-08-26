
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required


from employer.views import EmployerRegistration, SaveEmployer, \
    EmployerView, EditEmployer, PostJobsView,PostedJobsView,DeleteJob,PublishJob,EditPostJobsView, \
    JobDetailsView,ViewApplicants, SearchCandidatesView, AdminRequest, Inbox, DeleteInbox, GetJobs, DashBoardEmployer, ActivityLog


urlpatterns = patterns('',
    url(r'^registration/$', EmployerRegistration.as_view(), name="employer_registration"),
    url(r'^save_recruiter_details/$', SaveEmployer.as_view(), name="save_recruiter_details"),
    url(r'^employer_profile/$', login_required(EmployerView.as_view(), login_url="/login/"), name="employer_profile"),
    url(r'^edit_recruiter_profile/(?P<employer_id>\d+)/$', login_required(EditEmployer.as_view(), login_url="/login/"), name="edit_recruiter_profile"),
    url(r'^search_candidates/$', login_required(SearchCandidatesView.as_view(), login_url="/login/"), name='search_candidates'),
    url(r'^post_job/$', login_required(PostJobsView.as_view(), login_url="/login/"), name='postjobs'),
    url(r'^posted_jobs/$', login_required(PostedJobsView.as_view(), login_url="/login/"), name='posted_jobs'),
    url(r'^delete/(?P<job_id>\d+)/$', login_required(DeleteJob.as_view(), login_url="/login/"), name='delete_job'),
    url(r'^publish/(?P<job_id>\d+)/$', login_required(PublishJob.as_view(), login_url="/login/"), name='publish_job'),
    url(r'^edit/(?P<job_id>\d+)/$', login_required(EditPostJobsView.as_view(), login_url="/login/"), name='post_jobs_edit'),
    url(r'^details/(?P<job_id>\d+)/$', JobDetailsView.as_view(), name='job_details'),
    url(r'^applicants/(?P<job_id>\d+)/$', login_required(ViewApplicants.as_view(), login_url="/login/"), name='applicants'),
    url(r'^request/(?P<jobseeker_id>\d+)/$', login_required(AdminRequest.as_view(), login_url="/login/"), name='request'),
    url(r'^admin_reply/$', login_required(Inbox.as_view(), login_url="/login/"), name='admin_reply'),
    url(r'^dashboard/$', login_required(DashBoardEmployer.as_view(), login_url="/login/"), name="employer_dashboard"),
    url(r'^delete_reply/(?P<reply_id>\d+)/$', login_required(DeleteInbox.as_view(), login_url="/login/"), name='delete_reply'),
    url(r'^recruiter_log/$', login_required(ActivityLog.as_view(), login_url="/login/"), name='recruiter_log'), 
    url(r'^get_jobs/$', GetJobs.as_view(), name='get_jobs'),
)