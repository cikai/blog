/**
 * Created by Administrator on 2016-02-19.
 */
function htmlEncode(str)
{
    var    s    =    "";
    if    (str.length    ==    0)    return    "";
    s    =    str.replace(/&/g, "&amp;");
    s    =    s.replace(/</g, "&lt;");
    s    =    s.replace(/>/g, "&gt;");
    s    =    s.replace(/ /g, "&nbsp;");
    s    =    s.replace(/\'/g,"&apos;");
    s    =    s.replace(/\"/g, "&quot;");
    s    =    s.replace(/\n/g, "<br>");
    return    s;
}
function htmlDecode(str)
{
    var s = "";
    if(str.length    ==    0)    return    "";
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&apos;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}


function mySubstr(obj) {
    $(obj).find(".article-content-box").each(function(i,e) {
        if($(e).text().trim().length>100) {
            $(e).text($(e).text().substr(0,100));
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




function convertTime(timestramp) {
    var res = "";
    if(timestramp && typeof timestramp == "number") {
        var time = new Date(timestramp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        month = month < 10 ? '0' + month : month;
        var date = time.getDate();
        res = year+"-"+month+"-"+date;
    }
    return res;
}









