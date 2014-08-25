
from django.contrib.sites.models import Site
from django.db import models
from web.models import *

def site_variables(request):
	if request.user.is_authenticated():
		inbox_new = ''		
		request_new = ''
		if request.user.is_superuser:				
			user_type = 'admin'
			base_template = 'dashboard.html'
			request_new = RequestSend.objects.filter(is_new=True).count()
	   	elif request.user.recruiter_set.all().count() > 0:
	   		user_type = 'recruiter'	
	   		base_template = 'employer_dashboard.html'   
	   		inbox_new = Reply.objects.filter(request__recruiter__user = request.user, is_new=True).count()
	   	elif request.user.jobseeker_set.all().count() > 0:
	   		user_type = 'jobseeker'	
	   		base_template = 'jobseeker_dashboard.html'

		return {
		 	'user_type': user_type,
		 	'base_template': base_template,
		 	'inbox_new': inbox_new,
		 	'request_new': request_new
		}		
	else:
		return {
		 	'user_type': '',
		 	'base_template': 'base.html'
		}