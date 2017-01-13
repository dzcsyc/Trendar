/**
 * Created by I321310 on 1/13/2017.
 */

var rankUrl = 'http://127.0.0.1:8000/api/in_t/';
var tfUrl = 'http://127.0.0.1:8000/api/in_e/';

function display(urlAddress){
    $.ajax({
        type:'GET',
        url:urlAddress,
        dataType:'json',
        contentType:"application/json",
        success:function(data){
            var myChart = echarts.init(document.getElementById('word-cloud'));
            var topPos = [];
            $.each(data,function(index,item){
                topPos.push({
                    name:(item.name),
                    value:parseInt(item.rank * 1000)
                })
            });
//指定图表的配置项和数据
            var option={
                tooltip:{},
                series:[{
                    type:'wordCloud',
                    gridSize:10,
                    sizeRange:[12,50],
                    rotationRange:[-30,30],
                    shape:'circle',
                    width: '150%',
                    height: '80%',
                    textStyle:{
                        normal:{
                            color:function(){
                                return'rgb('+[
                                        Math.round(Math.random()*255),
                                        Math.round(Math.random()*255),
                                        Math.round(Math.random()*255)
                                    ].join(',')+')';
                            }
                        },
                        emphasis:{
                            shadowBlur:10,
                            shadowColor:'#333'
                        }
                    },
                    data:topPos
                }]
            };

//使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

//更新Header
            $('#top-phrases h3').text(((urlAddress == rankUrl)?'TextRank':'TF-IDF')+'算法词云图');

//更新top-positives
            var dlist = $('#top-positives dl');
            dlist.html('');
            if(topPos.length<5)
                dlist.text('Failed to load data');
            else{
                for(var i=0;i<5;i++){
                    dlist.append($('<dt></dt>').text(topPos[i].name.toString()));
                    dlist.append($('<dd></dd>').text(topPos[i].value.toString()));
                }
            }
        },
        error:function(data){
            alert("error");
        }
    });
};



$(document).ready(function(){
        display(rankUrl);
        $('.switch input').change(function(){
                if(this.checked)
                    display(tfUrl);
                else
                    display(rankUrl);
            }
        );
    }
);
