
from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^employer/', include('employer.urls')),
    url(r'^jobseeker/', include('jobseeker.urls')),
    url(r'^reports/', include('reports.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('web.urls')),
    url(r'^site_media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
)
