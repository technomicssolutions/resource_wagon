
from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required

from web.views import (Login, Logout, Home, ResetPassword, RequestView, ReplyEmployer, \
	DeleteRequest, ForgotPassword, Aboutus)

urlpatterns = patterns('',
    url(r'login/$', Login.as_view(), name="login"),
    url(r'logout/$', Logout.as_view(), name="logout"),
    url(r'^$', Home.as_view(), name="home"),
    url(r'^forgot_password/$', ForgotPassword.as_view(), name='forgot_password'),
    url(r'^reset_password/(?P<user_id>\d+)/$', login_required(ResetPassword.as_view()), name="reset_password"),
    url(r'^request/$', login_required(RequestView.as_view()), name="request"),
    url(r'^reply/(?P<request_id>\d+)/$', login_required(ReplyEmployer.as_view()), name="reply"),
    url(r'^delete_request/(?P<request_id>\d+)/$', DeleteRequest.as_view(), name='delete_request'),
    url(r'^aboutus/$', Aboutus.as_view(), name='aboutus'),
)