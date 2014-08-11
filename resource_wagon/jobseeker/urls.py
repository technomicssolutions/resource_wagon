from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from jobseeker.views import JobseekerRegistration, SavePersonalDetails, SaveCurrentEmployerDetails,  SaveEducationalDetails, SaveResumeDetails, SavePhotoDetails, JobSeekerView, EditDetails

urlpatterns = patterns('',
    url(r'^registration/$', JobseekerRegistration.as_view(), name="jobseeker_registration"),

    url(r'^save_personal_details/$', SavePersonalDetails.as_view(), name="save_personal_details"),
    url(r'^save_current_employer_details/$', SaveCurrentEmployerDetails.as_view(), name="save_current_employer_details"),
    url(r'^save_educational_details/$', SaveEducationalDetails.as_view(), name="save_educational_details"),
    url(r'^save_resume_details/$', SaveResumeDetails.as_view(), name="save_resume_details"),
    url(r'^save_photo_details/$', SavePhotoDetails.as_view(), name="save_photo_details"),
    url(r'^jobseeker_details/$', JobSeekerView.as_view(), name="jobseeker_details"),
    url(r'^edit_details/(?P<jobseeker_id>\d+)/$', EditDetails.as_view(), name="edit_details"),
  	
)