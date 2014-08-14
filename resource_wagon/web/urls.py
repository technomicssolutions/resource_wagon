
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from web.views import Login, Logout, Home, ResetPassword

urlpatterns = patterns('',
    url(r'login/$', Login.as_view(), name="login"),
    url(r'logout/$', Logout.as_view(), name="logout"),
    url(r'^$', login_required(Home.as_view(), login_url='login'), name="home"),
    url(r'^reset_password/(?P<user_id>\d+)/$', login_required(ResetPassword.as_view()), name="reset_password")
)