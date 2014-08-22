from django.contrib.sites.models import Site
from django.db import models
from web.models import *

def site_variables(request):
	if request.user.is_authenticated():		
		if request.user.is_superuser:				
			user_type = 'admin'
			base_template = 'dashboard.html'
	   	elif request.user.recruiter_set.all().count() > 0:
	   		user_type = 'recruiter'	
	   		base_template = 'employer_dashboard.html'   	
	   	elif request.user.jobseeker_set.all().count() > 0:
	   		user_type = 'jobseeker'	
	   		base_template = 'jobseeker_dashboard.html'
		return {
		 	'user_type': user_type,
		 	'base_template': base_template
		}		
	else:
		return {
		 	'user_type': '',
		 	'base_template': ''
		}