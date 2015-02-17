var d3 = require('d3');
var cubism = require('cubism');

function repositionOnCursorFocus(context) {
    context.on("focus", function (i) {
        d3.selectAll(".value").style("right", i == null ? null : context.size() - i + "px");
    });
}

function display(hashContainerId) {

    function currency(code) {
        return context.metric(function (start, stop, step, callback) {

            var metrics = contextValues.map(function (t) {
                return t;
            }).filter(function (t) {
                return code === t.code
            }).map(function(t){
                return t.value / 1000;
            });

            console.log(metrics);

            callback(null, metrics);
        }, code);
    }

    //size = (60 / step) * 60 * hours
    var context = cubism.context()
        .serverDelay(1000)
        .clientDelay(1000)
        .step(1000)
        .size(960);

    var contextValues = [];

    var currencyTransfers = {
        "EUR": 0, "GBP": 0
    };

    context.on("prepare", function (start, stop) {
        d3.json("data/transfers.json", function (transfers) {
            contextValues = transfers.map(function (t) {
                return {"code": t.currencyFrom, "value": t.amountSell};
            });
        });
        console.log("prepare");

    });

    context.on("beforechange", function (start, stop) {
        console.log("beforechange");
    });

    d3.select(hashContainerId).call(function (div) {

        div.append("div")
            .attr("class", "axis")
            .call(context.axis().orient("top"));

        div.selectAll(".horizon")
            .data(["EUR", "GBP"].map(currency))
            .enter().append("div")
            .attr("class", "horizon")
            .call(context.horizon().extent([-30, 30]));

        div.append("div")
            .attr("class", "rule")
            .call(context.rule());

    });

    repositionOnCursorFocus(context);

}

module.exports = display;