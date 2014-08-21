from django.contrib.sites.models import Site
from django.db import models
from web.models import *

def site_variables(request):
	if request.user.is_authenticated():		
		if request.user.is_superuser:				
			user_type = 'admin'
	   	elif request.user.recruiter_set.all().count() > 0:
	   		user_type = 'recruiter'	   	
	   	elif request.user.jobseeker_set.all().count() > 0:
	   		user_type = 'jobseeker'	
		return {
		 'user_type': user_type,
		}		
	else:
		return {
		 'user_type': '',
		}