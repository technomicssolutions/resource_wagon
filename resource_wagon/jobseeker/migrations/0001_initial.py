# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'PreviousEmployer'
        db.create_table(u'jobseeker_previousemployer', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('previous_employer_name', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
        ))
        db.send_create_signal(u'jobseeker', ['PreviousEmployer'])

        # Adding model 'Doctorate'
        db.create_table(u'jobseeker_doctorate', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('doctorate_name', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
        ))
        db.send_create_signal(u'jobseeker', ['Doctorate'])

        # Adding model 'Employment'
        db.create_table(u'jobseeker_employment', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('exp_yrs', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('exp_mnths', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('salary', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('designation', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('currency', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('skills', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('curr_industry', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('function', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
        ))
        db.send_create_signal(u'jobseeker', ['Employment'])

        # Adding M2M table for field previous_employer on 'Employment'
        db.create_table(u'jobseeker_employment_previous_employer', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('employment', models.ForeignKey(orm[u'jobseeker.employment'], null=False)),
            ('previousemployer', models.ForeignKey(orm[u'jobseeker.previousemployer'], null=False))
        ))
        db.create_unique(u'jobseeker_employment_previous_employer', ['employment_id', 'previousemployer_id'])

        # Adding model 'Education'
        db.create_table(u'jobseeker_education', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('basic_edu', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('basic_edu_specialization', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('pass_year_basic', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('masters', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('masters_specialization', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('pass_year_masters', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('resume_title', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('resume', self.gf('django.db.models.fields.files.FileField')(max_length=100, null=True, blank=True)),
            ('resume_text', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('is_resume_show', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal(u'jobseeker', ['Education'])

        # Adding M2M table for field doctrate on 'Education'
        db.create_table(u'jobseeker_education_doctrate', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('education', models.ForeignKey(orm[u'jobseeker.education'], null=False)),
            ('doctorate', models.ForeignKey(orm[u'jobseeker.doctorate'], null=False))
        ))
        db.create_unique(u'jobseeker_education_doctrate', ['education_id', 'doctorate_id'])

        # Adding model 'Location'
        db.create_table(u'jobseeker_location', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('location', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
        ))
        db.send_create_signal(u'jobseeker', ['Location'])

        # Adding model 'Jobseeker'
        db.create_table(u'jobseeker_jobseeker', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('country', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('city', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('mobile', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('land_num', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('gender', self.gf('django.db.models.fields.CharField')(max_length=7)),
            ('nationality', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('alt_mail', self.gf('django.db.models.fields.CharField')(max_length=200, null=True, blank=True)),
            ('photo', self.gf('django.db.models.fields.files.FileField')(max_length=100, null=True, blank=True)),
            ('marital_status', self.gf('django.db.models.fields.CharField')(max_length=20, null=True, blank=True)),
            ('religion', self.gf('django.db.models.fields.CharField')(max_length=20, null=True, blank=True)),
            ('dob', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('age', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('education', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['jobseeker.Education'], null=True, blank=True)),
            ('employment', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['jobseeker.Employment'], null=True, blank=True)),
        ))
        db.send_create_signal(u'jobseeker', ['Jobseeker'])

        # Adding M2M table for field applied_jobs on 'Jobseeker'
        db.create_table(u'jobseeker_jobseeker_applied_jobs', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('jobseeker', models.ForeignKey(orm[u'jobseeker.jobseeker'], null=False)),
            ('job', models.ForeignKey(orm[u'web.job'], null=False))
        ))
        db.create_unique(u'jobseeker_jobseeker_applied_jobs', ['jobseeker_id', 'job_id'])

        # Adding M2M table for field prefered_locations on 'Jobseeker'
        db.create_table(u'jobseeker_jobseeker_prefered_locations', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('jobseeker', models.ForeignKey(orm[u'jobseeker.jobseeker'], null=False)),
            ('location', models.ForeignKey(orm[u'jobseeker.location'], null=False))
        ))
        db.create_unique(u'jobseeker_jobseeker_prefered_locations', ['jobseeker_id', 'location_id'])

        # Adding M2M table for field prefered_companies on 'Jobseeker'
        db.create_table(u'jobseeker_jobseeker_prefered_companies', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('jobseeker', models.ForeignKey(orm[u'jobseeker.jobseeker'], null=False)),
            ('companyprofile', models.ForeignKey(orm[u'employer.companyprofile'], null=False))
        ))
        db.create_unique(u'jobseeker_jobseeker_prefered_companies', ['jobseeker_id', 'companyprofile_id'])

    def backwards(self, orm):
        # Deleting model 'PreviousEmployer'
        db.delete_table(u'jobseeker_previousemployer')

        # Deleting model 'Doctorate'
        db.delete_table(u'jobseeker_doctorate')

        # Deleting model 'Employment'
        db.delete_table(u'jobseeker_employment')

        # Removing M2M table for field previous_employer on 'Employment'
        db.delete_table('jobseeker_employment_previous_employer')

        # Deleting model 'Education'
        db.delete_table(u'jobseeker_education')

        # Removing M2M table for field doctrate on 'Education'
        db.delete_table('jobseeker_education_doctrate')

        # Deleting model 'Location'
        db.delete_table(u'jobseeker_location')

        # Deleting model 'Jobseeker'
        db.delete_table(u'jobseeker_jobseeker')

        # Removing M2M table for field applied_jobs on 'Jobseeker'
        db.delete_table('jobseeker_jobseeker_applied_jobs')

        # Removing M2M table for field prefered_locations on 'Jobseeker'
        db.delete_table('jobseeker_jobseeker_prefered_locations')

        # Removing M2M table for field prefered_companies on 'Jobseeker'
        db.delete_table('jobseeker_jobseeker_prefered_companies')

    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'employer.companyprofile': {
            'Meta': {'object_name': 'CompanyProfile'},
            'company_name': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'company_profile': ('django.db.models.fields.files.FileField', [], {'max_length': '100'}),
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'industry_type': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'jobseeker.doctorate': {
            'Meta': {'object_name': 'Doctorate'},
            'doctorate_name': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'jobseeker.education': {
            'Meta': {'object_name': 'Education'},
            'basic_edu': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'basic_edu_specialization': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'doctrate': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['jobseeker.Doctorate']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_resume_show': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'masters': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'masters_specialization': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'pass_year_basic': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'pass_year_masters': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'resume': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'resume_text': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'resume_title': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'jobseeker.employment': {
            'Meta': {'object_name': 'Employment'},
            'curr_industry': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'currency': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'designation': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'exp_mnths': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'exp_yrs': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'function': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'previous_employer': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['jobseeker.PreviousEmployer']", 'null': 'True', 'blank': 'True'}),
            'salary': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'skills': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'})
        },
        u'jobseeker.jobseeker': {
            'Meta': {'object_name': 'Jobseeker'},
            'age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'alt_mail': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'applied_jobs': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['web.Job']", 'null': 'True', 'blank': 'True'}),
            'city': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'country': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'dob': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'education': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['jobseeker.Education']", 'null': 'True', 'blank': 'True'}),
            'employment': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['jobseeker.Employment']", 'null': 'True', 'blank': 'True'}),
            'gender': ('django.db.models.fields.CharField', [], {'max_length': '7'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'land_num': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'marital_status': ('django.db.models.fields.CharField', [], {'max_length': '20', 'null': 'True', 'blank': 'True'}),
            'mobile': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'nationality': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'photo': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'prefered_companies': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['employer.CompanyProfile']", 'null': 'True', 'blank': 'True'}),
            'prefered_locations': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['jobseeker.Location']", 'null': 'True', 'blank': 'True'}),
            'religion': ('django.db.models.fields.CharField', [], {'max_length': '20', 'null': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'jobseeker.location': {
            'Meta': {'object_name': 'Location'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'location': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'})
        },
        u'jobseeker.previousemployer': {
            'Meta': {'object_name': 'PreviousEmployer'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'previous_employer_name': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'})
        },
        u'web.job': {
            'Meta': {'object_name': 'Job'},
            'applicants_count': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'}),
            'company': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['employer.CompanyProfile']", 'null': 'True', 'blank': 'True'}),
            'currency': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'document': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'education_req': ('django.db.models.fields.CharField', [], {'max_length': '70'}),
            'exp_req_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'exp_req_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'function': ('django.db.models.fields.CharField', [], {'max_length': '70'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'industry': ('django.db.models.fields.CharField', [], {'max_length': '70'}),
            'is_featured': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_publish': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'job_location': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'job_title': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'last_date': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'mail_id': ('django.db.models.fields.CharField', [], {'max_length': '70'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'nationality': ('django.db.models.fields.CharField', [], {'max_length': '70', 'null': 'True', 'blank': 'True'}),
            'order': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'phone': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'posting_date': ('django.db.models.fields.DateField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            'recruiter': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'ref_code': ('django.db.models.fields.CharField', [], {'max_length': '15', 'null': 'True', 'blank': 'True'}),
            'salary': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'search_count': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'}),
            'skills': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'specialization': ('django.db.models.fields.CharField', [], {'max_length': '70', 'null': 'True', 'blank': 'True'}),
            'summary': ('django.db.models.fields.CharField', [], {'max_length': '2000'})
        }
    }

    complete_apps = ['jobseeker']