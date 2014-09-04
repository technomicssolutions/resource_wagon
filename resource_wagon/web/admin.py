
from django.contrib import admin

from web.models import Job, RequestSend, Reply, ContactUs, CVRequest

admin.site.register(Job)
admin.site.register(RequestSend)
admin.site.register(Reply)
admin.site.register(ContactUs)
admin.site.register(CVRequest)