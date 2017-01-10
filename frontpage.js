/**
 * Created by I321310 on 12/30/2016.
 */

function Summary()
{

var TopReads =[{"content":"So, lucky I wasn’t hand crafting this because I probably would have given up before I typed 7,422 unique RGB combinations (correctly !!).  All I had to do was get my code working properly when writing the files and then interpret that data properly in Tableau."}];
var content= TopReads[0].content;
return content;

}

function Time()
{
	var UpdateTime=[{"time":"6:25 PM 1/5/2016"}];
	var time = UpdateTime[0].time;
	return time;
}

function RequestFrontPage() {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8000/api/frontpage/',
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                //alert(data);
                return data;
            },
            error: function (data) {
                return 1;
            }
        });
    }