$(function() {
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:8000/api/negtotal/',
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    var myChart = echarts.init(document.getElementById('main'));
                    var a = []
                    var type = []
                    $.each(data, function(index, item){
                        a.push(item.number)
                        type.push(item.typeof)
                    });
                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '客户抱怨点'
                        },
                        tooltip: {},
                        legend: {
                            data:['评论数']
                        },
                        xAxis: {
                            data: type
                        },
                        yAxis: {},
                        series: [{
                            name: '差评数',
                            type: 'bar',
                            data: a
                        }],
                        color:['#F1B718']
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    myChart.on('click', function (params) {
                        $.ajax({
                            type: 'GET',
                            url: 'http://127.0.0.1:8000/api/resource/'+params.name,
                            dataType: 'json',
                            contentType: "application/json",
                            success: function (data) {
                                $("#show").empty()
                                $.each(data, function(index, item) {
                                    $("#show").append(
                                            "<tr>"
                                            + "<td>" + item.content + "</td>"
                                            + "</tr>"
                                    );
                                })
                            },
                            error: function (data) {
                                alert("error");
                            }
                        });
                    });
                },
                error: function (data) {
                    alert("error");
                }
            });
        })
    </script>