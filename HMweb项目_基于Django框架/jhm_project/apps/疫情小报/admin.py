from django.contrib import admin
from .models import user
# Register your models here.
class userAdmin(admin.ModelAdmin):
  pass
# 表管理设置代码

admin.site.register(user,userAdmin)