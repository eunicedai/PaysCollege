
function chart(dataset, title){
    // var x = [];
    // x = dataset;
    var trace = {
        x: dataset,
        type: 'histogram',
        opacity: 0.5,
        marker: {
            color: 'green',
        },
    };
    var layout = {
        width: 800,
        height: 300,
        title: title,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
    };
    var data = [trace];
    Plotly.newPlot('chart', data, layout);
}


function datafilter(djson, table){
    var choose = sel.options[sel.selectedIndex].value;
    var val1 = document.querySelector(".text1").value;
    var num1 = parseInt(document.querySelector(".num1").value);
    var num2 = parseInt(document.querySelector(".num2").value);
    hide = true;
    document.querySelector(".popup").className = "popup hide";

    if(choose == "Major" || choose == "School"){
        var filtered = Object.keys(djson).filter(function(key){
            return key.toLowerCase().includes(val1.toLowerCase());
        });
        console.log(filtered);
    }else{
        var filtered = Object.keys(djson).filter(function(key){
            var temp = djson[key][choose].split("$", 2);
            temp = parseInt(temp[1].replace(/[^\w\s]|_/g, ""));
            return temp <= num2 && temp >= num1;
        });
        console.log(filtered);
    }

    var list = "";
    tempdata = {};
    if(table == "degree"){
        for(x in filtered){
            tempdata[filtered[x]] = djson[filtered[x]];
            list += "<tr>";
            list += "<td>"+filtered[x]+"</td>";
            list += "<td>"+djson[filtered[x]]["Starting Median Salary"]+"</td>";
            list += "<td>"+djson[filtered[x]]["Mid-Career Median Salary"]+"</td>";
            list += "<td>"+djson[filtered[x]]["Percent change from Starting to Mid-Career Salary"]+"</td>";
            list += "<td>"+djson[filtered[x]]["Mid-Career 10th Percentile Salary"]+"</td>";
            list += "<td>"+djson[filtered[x]]["Mid-Career 25th Percentile Salary"]+"</td>";
            list += "<td>"+djson[filtered[x]]["Mid-Career 75th Percentile Salary"]+"</td>";
            list += "<td>"+djson[filtered[x]]["Mid-Career 90th Percentile Salary"]+"</td>";
            list += "</tr>";
        }
    }
    data = tempdata;
    document.querySelector("table tbody").innerHTML = list;
    reload();
    resetcolor();
    change(1, 0, 1);
}

function change_detect(){
    var choose = sel.options[sel.selectedIndex].text;
    if(choose == "Major"){
        document.querySelector(".slider").style.display = "none";
        document.querySelector(".popshow").style.display = "block";
    }else{
        document.querySelector(".popshow").style.display = "none";
        document.querySelector(".slider").style.display = "block";
    }
}

function clickfilter(){
    if(hide == true){
        hide = false;
        document.querySelector(".popup").className = "popup show";
    }else{
        hide = true;
        document.querySelector(".popup").className = "popup hide";
    }
}

function reset(){
    document.querySelector("table tbody").innerHTML = tr;
    data = djson;
    resetcolor();
    reload();
    change(1, 0, 1);
}

function reload(){
    start_s = [], mid_s = [], ten_s = [], tw_s = [], sev_s = [], nin_s = [], all = [];
    for(x in data){
        var temp = data[x]["Starting Median Salary"].split("$", 2);
        start_s.push(parseInt(temp[1].replace(/[^\w\s]|_/g, "")));
        var temp = data[x]["Mid-Career Median Salary"].split("$", 2);
        mid_s.push(parseInt(temp[1].replace(/[^\w\s]|_/g, "")));
        var temp = data[x]["Mid-Career 10th Percentile Salary"].split("$", 2);
        ten_s.push(parseInt(temp[1].replace(/[^\w\s]|_/g, "")));
        var temp = data[x]["Mid-Career 25th Percentile Salary"].split("$", 2);
        tw_s.push(parseInt(temp[1].replace(/[^\w\s]|_/g, "")));
        var temp = data[x]["Mid-Career 75th Percentile Salary"].split("$", 2);
        sev_s.push(parseInt(temp[1].replace(/[^\w\s]|_/g, "")));
        var temp = data[x]["Mid-Career 90th Percentile Salary"].split("$", 2);
        nin_s.push(parseInt(temp[1].replace(/[^\w\s]|_/g, "")));
    }
    all.push(start_s);
    all.push(mid_s);
    all.push(ten_s);
    all.push(tw_s);
    all.push(sev_s);
    all.push(nin_s);

    chart(start_s, "Starting Median Salary");
}