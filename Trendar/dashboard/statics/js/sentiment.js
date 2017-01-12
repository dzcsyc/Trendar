function display() {
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:8000/api/sentiment/',
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    var myChart = echarts.init(document.getElementById('sentimentDistribution'));
                    var a = []
                    $.each(data, function(index, item){
                        a.push(item.number)
                    });
                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: 'Trendar 商品评论情感分析'
                        },
                        tooltip: {},
//                        legend: {
//                            data:['评论数']
//                        },
                        xAxis: {
                            data: ["0-0.1","0.1-0.2","0.2-0.3","0.3-0.4","0.4-0.5","0.5-0.6","0.6-0.7","0.7-0.8","0.8-0.9","0.9-1"]
                        },
                        yAxis: {},
                        series: [{
                            name: '评论数',
                            type: 'bar',
                            data: a
                        }],
                        color:['#F1B718']
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                },
                error: function (data) {
                    alert("error");
                }
            });
        }
