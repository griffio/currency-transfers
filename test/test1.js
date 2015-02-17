var test = require('tape');
var d3 = require('d3');

test('t test', function(t) {

    test('map transfer data', function(t) {

        var fmt = d3.time.format("%d-%b-%y");
        var rows = [ {"a": "22-Jan-15", "b": 1.05, "c": 1}, {"a": "19-Jan-15", "b": -1.99, "c": 2}, {"a": "21-Jan-15", "b":1.09, "c": 3} ];
        rows.map(function(d) { return [fmt.parse(d.a), d.b, d.c]; }).filter(function(d) { return d[2]; });
        t.end();
    });

    t.end();
});

