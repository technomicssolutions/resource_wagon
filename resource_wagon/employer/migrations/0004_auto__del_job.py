# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Job'
        db.delete_table(u'employer_job')

    def backwards(self, orm):
        # Adding model 'Job'
        db.create_table(u'employer_job', (
            ('is_featured', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('mail_id', self.gf('django.db.models.fields.CharField')(max_length=70)),
            ('currency', self.gf('django.db.models.fields.CharField')(max_length=30, null=True, blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('is_publish', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('exp_req_min', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('recruiter', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['employer.Recruiter'])),
            ('job_location', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('document', self.gf('django.db.models.fields.files.FileField')(max_length=100, null=True, blank=True)),
            ('job_title', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('function', self.gf('django.db.models.fields.CharField')(max_length=70)),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('education_req', self.gf('django.db.models.fields.CharField')(max_length=70)),
            ('exp_req_max', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('company', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['employer.CompanyProfile'], null=True, blank=True)),
            ('phone', self.gf('django.db.models.fields.CharField')(max_length=50, null=True, blank=True)),
            ('nationality', self.gf('django.db.models.fields.CharField')(max_length=70, null=True, blank=True)),
            ('specialization', self.gf('django.db.models.fields.CharField')(max_length=70, null=True, blank=True)),
            ('salary', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True)),
            ('ref_code', self.gf('django.db.models.fields.CharField')(max_length=15, null=True, blank=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('skills', self.gf('django.db.models.fields.CharField')(max_length=50, null=True, blank=True)),
            ('industry', self.gf('django.db.models.fields.CharField')(max_length=70)),
            ('summary', self.gf('django.db.models.fields.CharField')(max_length=500)),
            ('last_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('posting_date', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
            ('order', self.gf('django.db.models.fields.IntegerField')(default=0)),
        ))
        db.send_create_signal(u'employer', ['Job'])

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
        u'employer.recruiter': {
            'Meta': {'object_name': 'Recruiter'},
            'city': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'company': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['employer.CompanyProfile']", 'null': 'True', 'blank': 'True'}),
            'country': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'land_num': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'mobile': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        }
    }

    complete_apps = ['employer']