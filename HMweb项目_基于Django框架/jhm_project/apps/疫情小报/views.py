from django.shortcuts import render, HttpResponse, redirect
from .models import user
from django.core import serializers
import os
# Create your views here.
def index(request):
    return render(request, '疫情小报/index.html')


def epidemic_data(request):
    return render(request, '疫情小报/epidemic_data.html')


def map(request):
    return render(request, '疫情小报/map.html')


def yi_baike(request):
    return render(request, '疫情小报/yq_baike.html')


def yq_ol(request):
    if request.method == "POST":
        longitude = request.POST.get('longitude')
        latitude = request.POST.get('latitude')
        data_1 = {
            'lable': "1",
            'longitude': longitude,
            'latitude': latitude
        }
        return render(request, '疫情小报/yq_ol.html', {'coordiation': data_1})
    else:
        data_2 = {
            'lable': "2"
        }
        return render(request, '疫情小报/yq_ol.html', {'coordiation': data_2})


def admin_new(request):
    if request.method == 'POST':
        id_test = request.POST.get('id', None)
        b = user.objects.get(id=id_test)
        b.delete()
        data = user.objects.all()
        return render(request, '疫情小报/admin.html', {"data": serializers.serialize('json', data)})
    else:
        data = user.objects.all()
        return render(request, '疫情小报/admin.html', {"data": serializers.serialize('json', data)})


def register(request):
    return render(request, '疫情小报/register.html')


def sucessful(request):
    if request.method == "POST":
        user_information = user()
        user_information.u_name = request.POST.get('name')
        user_information.u_gender = request.POST.get('gender')
        user_information.u_email = request.POST.get('email')
        user_information.u_password = request.POST.get('password')
        user_information.u_longitude = request.POST.get('longitude')
        user_information.u_latitude = request.POST.get('latitude')
        user_information.save()

        # file = request.FILES.get('file')
        # with open(os.path.join("G:\\桌面\\HMweb项目_基于Django框架\\jhm_project\\media", file.name), 'wb') as fi:
        #     for item in file.chunks():
        #         fi.write(item)
        # fi.close()

        return render(request, '疫情小报/sucessful.html')
    else:
        return render(request, '疫情小报/sucessful.html')
