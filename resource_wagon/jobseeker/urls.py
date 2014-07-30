from django.conf.urls import patterns, url


from jobseeker.views import JobseekerRegistration, SavePersonalDetails, SaveCurrentEmployerDetails

urlpatterns = patterns('',
    url(r'^registration/$', JobseekerRegistration.as_view(), name="jobseeker_registration"),

    url(r'^save_personal_details/$', SavePersonalDetails.as_view(), name="save_personal_details"),
    url(r'^save_current_employer_details/$', SaveCurrentEmployerDetails.as_view(), name="save_current_employer_details"),

   
)