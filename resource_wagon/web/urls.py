
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from web.views import Login, Logout, Home

urlpatterns = patterns('',
    url(r'login/$', Login.as_view(), name="login"),
    url(r'logout/$', Logout.as_view(), name="logout"),
    url(r'^$', login_required(Home.as_view(), login_url='login'), name="home"),
)