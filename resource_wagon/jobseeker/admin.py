
from django.contrib import admin

from jobseeker.models import Employment, Education, Jobseeker, Doctorate, Location

admin.site.register(Employment)
admin.site.register(Education)
admin.site.register(Jobseeker)
admin.site.register(Doctorate)
admin.site.register(Location)