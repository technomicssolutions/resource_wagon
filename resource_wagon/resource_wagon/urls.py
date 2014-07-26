from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^employer/', include('employer.urls')),
    url(r'^jobseeker/', include('jobseeker.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('web.urls')),
)
