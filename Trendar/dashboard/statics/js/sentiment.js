function display() {
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/api/sentiment/',
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            var myChart = echarts.init(document.getElementById('sentimentDistribution'));
            var distributeCount = [];
            $.each(data, function(index, item){
                distributeCount.push(item.number);
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
                    data: distributeCount
                }],
                color:['#F1B718']
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.onresize = myChart.resize;

            // 统计好中差评
            var dlist = $('#top-positives dl');
            dlist.html('');
            if(distributeCount.length < 10)
                dlist.text('Failed to load data');
            else{
                var badCount = distributeCount[0] + distributeCount[1] + distributeCount[2] + distributeCount[3];
                var neutralCount = distributeCount[4] + distributeCount[5] + distributeCount[6];
                var goodCount = distributeCount[7] + distributeCount[8] + distributeCount[9];
                dlist.append($('<dt></dt>').text('好评'));
                dlist.append($('<dd></dd>').text(goodCount.toString()));
                dlist.append($('<dt></dt>').text('中评'));
                dlist.append($('<dd></dd>').text(neutralCount.toString()));
                dlist.append($('<dt></dt>').text('差评'));
                dlist.append($('<dd></dd>').text(badCount.toString()));
            }
        },
        error: function (data) {
            alert("error");
        }
    });

};

$(document).ready(
    display()
);




