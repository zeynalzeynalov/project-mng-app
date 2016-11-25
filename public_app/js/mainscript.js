function processAjaxRequest(js_project_id)
{
    var tmp_js_project_id = js_project_id.split('_');
    js_project_id = tmp_js_project_id[1];

    if (js_project_id.length == 0)
    { 
        document.getElementById("ajaxResponseContainer" + js_project_id).innerHTML = "";
        return;
    } 
    else 
    {
        var xmlhttpPROJECT = new XMLHttpRequest();
        xmlhttpPROJECT.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {       
                var objArrayPROJECT = JSON.parse(this.responseText);
                document.getElementById("ajaxResponseTotalProjectTimeContainer" + js_project_id).innerHTML = objArrayPROJECT[0].total_time_diff_text;

                var xmlhttpTimeRecords = new XMLHttpRequest();
                xmlhttpTimeRecords.onreadystatechange = function()
                {
                    if (this.readyState == 4 && this.status == 200)
                    {
                        var objArray = JSON.parse(this.responseText);
                        var outputHtml = "";
                        for(var i = 0; i < objArray.length; i++)
                        {
                            outputHtml += ('<span>' + objArray[i].starting_time_stamp + ' - ' + objArray[i].ending_time_stamp + ' = ' + objArray[i].time_diff_text + '</span><br>');
                        }

                        document.getElementById("ajaxResponseContainer" + js_project_id).innerHTML = outputHtml;
              

                        if(document.getElementById("btnAjax_" + js_project_id).value == "Start working")
                        {
                            document.getElementById("btnAjax_" + js_project_id).value = "Stop working";
                            document.getElementById("btnAjax_" + js_project_id).className = "btn btn-danger";
                        }
                        else
                        {
                            document.getElementById("btnAjax_" + js_project_id).value = "Start working";
                            document.getElementById("btnAjax_" + js_project_id).className = "btn btn-success"; 
                        }
                    }
                };

                xmlhttpTimeRecords.open("GET", "restfulapi/getjson.php/getProjectTimeRecords/" + js_project_id, true);
                xmlhttpTimeRecords.send();
            }
        }
        
        xmlhttpPROJECT.open("GET", "restfulapi/performaction.php/manageProjectTimeRecord/" + js_project_id, true);
        xmlhttpPROJECT.send();
    }
}