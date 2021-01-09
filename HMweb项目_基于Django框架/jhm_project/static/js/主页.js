function $1(pro, nx) {
    if (nx === "id") {
        return typeof pro === "string" ? document.getElementById(pro) : null;
    } else if (nx === "class") {
        return typeof pro === "string" ? document.getElementsByClassName(pro) : null;
    } else if (nx === "TagName")
        return typeof pro === "string" ? document.getElementsByTagName(pro) : null;
    else
        return 1;
}//简化的全局函数domc操作

window.onload = function () {
    if ($1('id', 'id').value === 'epidemic_data.html') {// epidemic_data.html的js
        $.getJSON("http://api.tianapi.com/txapi/ncovcity/index?key=260f22746f2c2ef099171edef2c813a6", function (data, status) {
            for (let i = 0; i < data.newslist.length; i++) {
                let option = document.createElement('option');
                option.innerHTML = `${data.newslist[i].provinceName}`;
                option.value = `${data.newslist[i].provinceShortName}`;
                $1('select_1', 'id').appendChild(option);//不要加‘’;
            }
            // 地图加载
            $.get("https://geo.datav.aliyun.com/areas/bound/100000_full.json", function (geoJson) {
                let myChart = echarts.init(document.getElementById('jhm'));
                echarts.registerMap('China', geoJson);
                let data_1 = [];
                for (let i = 0; i < data.newslist.length; i++) {
                    var item = {};
                    if (data.newslist[i].provinceName === '台湾') {
                        item = {
                            name: data.newslist[i].provinceName + "省",
                            value: data.newslist[i].confirmedCount
                        }

                    } else {
                        item = {
                            name: data.newslist[i].provinceName,
                            value: data.newslist[i].confirmedCount
                        }
                    }
                    data_1.push(item);
                }
                option = {
                    title: {
                        text: '中国战役地图',
                        subtext: '疫情地图可视化',
                        textStyle: {
                            color: "#d4d4d4",
                            fontFamily: "kaiti",
                            fontSize: 20,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c}人'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        type: 'piecewise',
                        inRange: {
                            color: ['#F8F9FA', '#FFAA85', '#FF7B69', '#CC2929', '#8C0D0D', '#660208']
                        },
                        pieces: [
                            {min: 1400,},
                            {min: 1000, max: 1399},
                            {min: 500, max: 999},
                            {min: 100, max: 499},
                            {min: 10, max: 99},
                            {min: 0, max: 9},
                        ],
                    },
                    series: [
                        {

                            name: '中国战役',
                            type: 'map',
                            mapType: 'China', // 自定义扩展图表类型
                            label: {
                                show: true,
                                fontSize: 10,
                                fontFamily: "kaiti",
                            },
                            itemStyle: {
                                shadowColor: '#d4d4d4',
                                shadowBlur: 3
                            },
                            data: data_1,
                            zoom: 1.4,
                            center: [95.97, 34.71],
                            roam: true,
                            scaleLimit: {
                                min: 1.4,
                                max: 5
                            }
                        }

                    ]
                };
                myChart.setOption(option);
            });


            // 下拉省市的二级联动系列方法
            $1('select_1', 'id').onchange = function () {
                let city_1 = $1('select_1', 'id');
                let city_2 = $1('select_2', 'id');
                $1('select_2', 'id').innerHTML = '<option>选择城市</option>';
                let select_city_1 = city_1.options[city_1.selectedIndex].innerText;
                for (let i = 0; i < data.newslist.length; i++) {
                    if (data.newslist[i].provinceName === select_city_1) {

                        if (data.newslist[i].cities.length > 0) {
                            for (let q = 0; q < data.newslist[i].cities.length; q++) {
                                let option = document.createElement('option');
                                option.innerHTML = `${data.newslist[i].cities[q].cityName}`;
                                option.value = `${data.newslist[i].cities[q].cityName}`;
                                $1('select_2', 'id').appendChild(option);//不要加‘’;
                            }
                        } else {
                            let option = document.createElement('option');
                            option.innerHTML = `${data.newslist[i].provinceShortName}`;
                            option.value = `${data.newslist[i].provinceShortName}`;
                            $1('select_2', 'id').appendChild(option);//不要加‘’;
                        }
                    }
                }//下拉省市的二级联动


                //下拉列表点击可视化分析
                let select_city_2 = city_2.options[city_2.selectedIndex].innerText;
                for (let i = 0; i < data.newslist.length; i++) {
                    if (select_city_1 === data.newslist[i].provinceName && city_2.options[0].innerText === '选择城市') {
                        //构造数据
                        let data_1 = [];//第一个数据
                        let data_2_1 = [];//第二个数据，各省的省名
                        let data_2_2 = [];//各省的数据value;
                        let item_1 = {value: `${data.newslist[i].currentConfirmedCount}`, name: "疑似确诊病例"};
                        let item_2 = {value: `${data.newslist[i].confirmedCount}`, name: "确诊病例"};
                        let item_3 = {value: `${data.newslist[i].suspectedCount}`, name: "疑似病例"};
                        let item_4 = {value: `${data.newslist[i].curedCount}`, name: "治愈病例"};
                        let item_5 = {value: `${data.newslist[i].deadCount}`, name: "死亡病例"};
                        data_1.push(item_1);
                        data_1.push(item_2);
                        data_1.push(item_3);
                        data_1.push(item_4);
                        data_1.push(item_5);
                        for (let j = 0; j < data.newslist[i].cities.length; j++) {
                            data_2_1.push(data.newslist[i].cities[j].cityName);
                            data_2_2.push(data.newslist[i].cities[j].confirmedCount);
                        }
                        //注册echart
                        let chart_1 = echarts.init($1('data-visit-1-div_1', 'id'));
                        let chart_2 = echarts.init($1('jhm_1', 'id'));
                        let chart_3 = echarts.init($1('data-visit-1-div_2', 'id'));
                        //配置项
                        let option_1 = {
                            title: {
                                text: `${data.newslist[i].provinceName}总体疫情统计图`,
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)'
                            },
                            legend: {
                                orient: 'vertical',
                                left: "left",
                                top: 'bottom',
                                itemGap: 2,
                                height: 80,
                                width: 8,
                                textStyle: {
                                    fontSize: 8,
                                },
                                data: ['疑似确诊病例', '确诊病例', '疑似病例', '治愈病例', '死亡病例']
                            },
                            series: [
                                {
                                    name: '疫情统计',
                                    type: 'pie',
                                    radius: ['40%', '70%'],
                                    center: ["60%", "58%"],
                                    avoidLabelOverlap: true,
                                    label: {
                                        normal: {
                                            show: true,
                                            fontSize: 10
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            length: 5,
                                            show: true
                                        }
                                    },
                                    data: data_1
                                }
                            ]
                        };
                        let option_2 = {
                            title: {
                                text: `${data.newslist[i].provinceName}各省确诊病例统计图`,
                                right: "center"
                            },
                            xAxis: {
                                type: 'category',
                                data: data_2_1,
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: data_2_2,
                                type: 'line',
                                smooth: true
                            }]
                        };
                        let option_3 = {};
                        //设置配置项
                        chart_1.setOption(option_1);
                        chart_2.setOption(option_2);
                        chart_3.setOption(option_3);


                    }
                }


            };
            $1('select_2', 'id').onchange = function () {
                let city_1 = $1('select_1', 'id');
                let city_2 = $1('select_2', 'id');
                let select_city_1 = city_1.options[city_1.selectedIndex].innerText;
                let select_city_2 = city_2.options[city_2.selectedIndex].innerText;
            };
        });
    }

    if ($1('id', 'id').value === 'index') {//主页js
        $1('title-div2-img2', 'id').onclick = function () {
            $1('title-sign', 'id').style.display = 'block';
        };
        //注册弹出框的叉号功能；
        $1('title-sign-img', 'id').onclick = function () {
            $1('title-sign', 'id').style.display = 'none';
            $1('title-sign-input', 'id').value = '';
            $1('title-sign-input1', 'id').value = '';
        };//中间数据处理；

        //中间横向导航栏缩放函数
        let obj = $1('title-div-ul-li-ul', 'class');
        for (let i = 0; i < obj.length; i++) {
            obj[i].parentElement.onmouseover = function () {
                obj[i].style.display = 'block';
            }
        }
        for (let i = 0; i < obj.length; i++) {
            obj[i].parentElement.onmouseout = function () {
                obj[i].style.display = 'none';
            };
        }
    }

};
