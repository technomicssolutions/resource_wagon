from django.conf.urls import patterns, url


from jobseeker.views import JobseekerRegistration

urlpatterns = patterns('',
    url(r'^registration/$', JobseekerRegistration.as_view(), name="jobseeker_registration"),
   
)