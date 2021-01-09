window.onload = function () {
    var map;
    require(["esri/Map",
            "esri/Views/MapView",
            // "esri/Graphic",
            // "esri/layers/MapImageLayer",

        ],
        function (Map,
                  MapView,
                  // Graphic,
                  // MapImageLayer,
    ) {
           map = new Map({
                basemap: 'dark-gray-vector',
           });

            var view = new MapView({
                map: map,
                container: "view_map",
                zoom:3,
                center: [110, 37],
            });

            view.ui.components=[];

    });


    document.getElementById('globe').onclick=function() {
        $('#xia_la').css({
            transform: "translate(0px, -530px)"
        });
        $('#xia_la_button').css({
            transform: "translate(0px, -60px)"
        });
    };
    document.getElementById('map_analysis').onclick=function () {
        $('#xia_la').css({
            transform: "translate(0px, -1701px)"
        });
        $('#xia_la_button').css({
            transform: "translate(0px, 0px)"
        });
    };

    document.getElementById('sou_su_true').onmouseover = function () {
        $('sou_su_div').css({
              animation: "ff 1s infinite alternate"
        });
    };
    $.getJSON('http://api.tianapi.com/txapi/ncovabroad/index?key=260f22746f2c2ef099171edef2c813a6', function (getdata) {
        for (let j = 0; j < getdata.newslist.length; j++) {
            let table = document.getElementById('table');
            var th = document.createElement('tr');
            th.innerHTML = `<td style="width:11%">${getdata.newslist[j].continents}</td>
                            <td style="width:30%">${getdata.newslist[j].provinceName}</td>
                            <td style="width:11%">${getdata.newslist[j].currentConfirmedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadCount}</td>
                            <td style="width:11%">${getdata.newslist[j].curedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadRate}</td>                         
`;
            table.appendChild(th);
        }//添加全球疫情分析数据；

        for (let j = 0; j < getdata.newslist.length; j++) {
            let currentConfirmedCount = 0;
            let deadCount = 0;
            let curedCount = 0;
            for (let j = 0; j < getdata.newslist.length; j++) {
                currentConfirmedCount += getdata.newslist[j].currentConfirmedCount;
                deadCount += getdata.newslist[j].deadCount;
                curedCount += getdata.newslist[j].curedCount;
            }
            document.getElementById('item_1').innerHTML = `<p>全球死亡人数</p><i>${deadCount}</i>`;
            document.getElementById('item_2').innerHTML = `<p>全球确诊人数</p><i>${currentConfirmedCount}</i>`;
            document.getElementById('item_3').innerHTML = `<p>全球治愈人数</p><i>${curedCount}</i>`;
        }//添加疫情大球数据

        //在线查询特定国家疫情数据
        var context=document.getElementById('sou_su_true');
        document.getElementById('sou_su_true').onchange = function () {
            var table = document.getElementById('table');
            if (context.value === "") {
                for (let j = 0; j < getdata.newslist.length; j++) {
                    let table = document.getElementById('table');
                    var th_3 = document.createElement('tr');
                    th_3.innerHTML = `<td style="width:11%">${getdata.newslist[j].continents}</td>
                            <td style="width:30%">${getdata.newslist[j].provinceName}</td>
                            <td style="width:11%">${getdata.newslist[j].currentConfirmedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadCount}</td>
                            <td style="width:11%">${getdata.newslist[j].curedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadRate}</td>                         
`;
                    table.appendChild(th_3);
                }
                 return;
            }

            for (let j = 0; j < getdata.newslist.length; j++) {
                if(context.value===getdata.newslist[j].provinceName||context.value===getdata.newslist[j].continents){
                     table.innerHTML = "";
                }
            }

            if(table.innerHTML!==""&&context.value!==""){
                alert("输入有误,请重新输入");
                return;
            }
          for (let j = 0; j < getdata.newslist.length; j++) {
                switch (context.value.toString()) {
                    case `${getdata.newslist[j].continents}`:
                        let th = document.createElement('tr');
                        th.innerHTML=`<td style="width:11%">${getdata.newslist[j].continents}</td>
                            <td style="width:30%">${getdata.newslist[j].provinceName}</td>
                            <td style="width:11%">${getdata.newslist[j].currentConfirmedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadCount}</td>
                            <td style="width:11%">${getdata.newslist[j].curedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadRate}%</td>                         
`;
                        table.appendChild(th);
                        break;
                    case `${getdata.newslist[j].provinceName}`:
                         let th_1 = document.createElement('tr');
                        th_1.innerHTML=`<td style="width:11%">${getdata.newslist[j].continents}</td>
                            <td style="width:30%">${getdata.newslist[j].provinceName}</td>
                            <td style="width:11%">${getdata.newslist[j].currentConfirmedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadCount}</td>
                            <td style="width:11%">${getdata.newslist[j].curedCount}</td>
                            <td style="width:11%">${getdata.newslist[j].deadRate}%</td>                         
`;
                        table.appendChild(th_1);
                        break;
                }

            }
        }

    });

};
