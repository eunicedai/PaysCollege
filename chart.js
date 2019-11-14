//設定好 svg 的大小
var w = 600, h = 250, padding = 30, barMargin = 2;

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


