from django.db import models

# Create your models here.
# 管理器的书写
class Manager(models.Manager):
    def get_queryset(self):
        return super(Manager, self).get_queryset().all()

    def Createuser(cls, name, gender, email, password, u_longitude, u_latitude):
        obj = cls.model()
        obj.u_name = name
        obj.u_gender = gender
        obj.u_email = email
        obj.u_password = password
        obj.u_longitude = u_longitude
        obj.u_latitude = u_latitude
        return obj


# 创建模型类对应的表，此表为用户表；
class user(models.Model):
    # 生成管理器对象
    # object_new = Manager()
    # 生成班级表
    u_name = models.CharField(max_length=10, unique=True)
    u_gender = models.CharField(max_length=4)
    u_email = models.CharField(max_length=20)
    u_password = models.CharField(max_length=20)
    u_longitude = models.CharField(max_length=20)
    u_latitude = models.CharField(max_length=20)

    # def __str__(self):
    #     data = {
    #         'name': self.u_name,
    #         'gender': self.u_gender,
    #         'birthday': self.u_birthday,
    #         'email': self.u_email,
    #         'password': self.u_password
    #     }
    #     return data

    class Meta:
        db_table = 'user'
