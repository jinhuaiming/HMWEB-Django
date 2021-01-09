from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name="main"),  # 主页
    path('epidemic_data/', views.epidemic_data, name='epidemic_data'),
    path('map/', views.map, name='map'),
    path('yi_baike/', views.yi_baike, name='yq_baike'),
    path('yq_ol/', views.yq_ol, name='yq_ol'),
    path('admin_new/', views.admin_new, name='admin_new'),
    path('register/', views.register, name='register'),
    path('sucessful/', views.sucessful, name='sucessful'),
]
