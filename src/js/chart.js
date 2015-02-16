var d3 = require('d3');
var cubism = require('cubism');

function repositionOnCursorFocus(context) {
    context.on("focus", function (i) {
        d3.selectAll(".value").style("right", i == null ? null : context.size() - i + "px");
    });
}

function display(hashContainerId) {

    function currency(code) {
        var value = 0,
            values = [],
            i = 0,
            last;
        return context.metric(function(start, stop, step, callback) {
            start = +start;
            stop = +stop;
            if (isNaN(last)) last = start;
            while (last < stop) {
                last += step;
                value = Math.max(-10, Math.min(10, value + .8 * Math.random() - .4 + .2 * Math.cos(i += .2)));
                console.log(value);
                values.push(value);
            }
            callback(null, values = values.slice((start - stop) / step));
        }, code);
    }
    //size = (60 / step) * 60 * hours
    var context = cubism.context()
        .serverDelay(0)
        .clientDelay(0)
        .step(1000)
        .size(960);

    context.on("prepare", function (start, stop) {
        console.log("prepare");
    });

    context.on("beforechange", function (start, stop) {
        console.log("beforechange");
    });

    var metrics = [];

    metrics.push(currency("EUR"),currency("GBP"));

    d3.select(hashContainerId).call(function(div) {

        div.append("div")
            .attr("class", "axis")
            .call(context.axis().orient("top"));

        div.selectAll(".horizon")
            .data(metrics)
            .enter().append("div")
            .attr("class", "horizon")
            .call(context.horizon().extent([-20, 20]));

        div.append("div")
            .attr("class", "rule")
            .call(context.rule());

    });

    repositionOnCursorFocus(context);

}

module.exports = display;