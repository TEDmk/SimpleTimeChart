let chartContainer = new SimpleTimeChart.ChartContainer(
    "myChart", // Div ID of the containing the chart
    800,  // Width of the chart
    70,  // Axis Tickness
    {
        color: "#D0D0D0", // Color of axis text
        backgroundColor: "#292F33" // Background of the container
    }
);

let chart = chartContainer.newChart(300);
let secondChart = chartContainer.newChart(200);
let volumeChart = chartContainer.newChart(100);

let data = [{"date":1546300800,"high":0.01232199,"low":0.012105,"open":0.01227412,"close":0.01224702,"volume":11.47474031,"quoteVolume":938.52999477,"weightedAverage":0.01222629},{"date":1546315200,"high":0.01235758,"low":0.01218015,"open":0.01225446,"close":0.01223056,"volume":6.96543437,"quoteVolume":567.59424307,"weightedAverage":0.01227185},{"date":1546329600,"high":0.01234246,"low":0.01217325,"open":0.012231,"close":0.01228311,"volume":7.10957659,"quoteVolume":578.44708528,"weightedAverage":0.01229079},{"date":1546344000,"high":0.01237977,"low":0.0122487,"open":0.01229189,"close":0.0122911,"volume":9.1454552,"quoteVolume":743.25528044,"weightedAverage":0.01230459},{"date":1546358400,"high":0.01245827,"low":0.01225163,"open":0.01228001,"close":0.01245827,"volume":20.97501172,"quoteVolume":1696.31090129,"weightedAverage":0.01236507},{"date":1546372800,"high":0.01264831,"low":0.01239196,"open":0.01242936,"close":0.01249544,"volume":29.14045482,"quoteVolume":2322.77559678,"weightedAverage":0.01254553},{"date":1546387200,"high":0.01259999,"low":0.01243199,"open":0.01249549,"close":0.01247901,"volume":10.03136424,"quoteVolume":799.56105322,"weightedAverage":0.01254608},{"date":1546401600,"high":0.01278436,"low":0.01247901,"open":0.01247901,"close":0.01275239,"volume":19.83723467,"quoteVolume":1564.66915417,"weightedAverage":0.01267822},{"date":1546416000,"high":0.01286514,"low":0.01257456,"open":0.01275239,"close":0.01276012,"volume":60.39925402,"quoteVolume":4744.76267984,"weightedAverage":0.01272966},{"date":1546430400,"high":0.01317618,"low":0.01269283,"open":0.01276022,"close":0.013,"volume":99.55834375,"quoteVolume":7678.08091916,"weightedAverage":0.01296656},{"date":1546444800,"high":0.01392092,"low":0.01299499,"open":0.01299499,"close":0.01357587,"volume":159.00918413,"quoteVolume":11686.69623364,"weightedAverage":0.01360599},{"date":1546459200,"high":0.0138,"low":0.0131613,"open":0.01357594,"close":0.01329,"volume":62.60722674,"quoteVolume":4677.28089524,"weightedAverage":0.01338538},{"date":1546473600,"high":0.01336862,"low":0.0130804,"open":0.01329,"close":0.01315601,"volume":30.40567552,"quoteVolume":2309.02992227,"weightedAverage":0.01316816},{"date":1546488000,"high":0.013234,"low":0.01309201,"open":0.01315614,"close":0.01315417,"volume":8.46794783,"quoteVolume":643.58521631,"weightedAverage":0.01315746},{"date":1546502400,"high":0.0133,"low":0.01291811,"open":0.01315427,"close":0.01297533,"volume":45.1276967,"quoteVolume":3451.78777749,"weightedAverage":0.01307371},{"date":1546516800,"high":0.01307378,"low":0.0129,"open":0.01297533,"close":0.01301303,"volume":35.38764064,"quoteVolume":2729.50167879,"weightedAverage":0.01296487},{"date":1546531200,"high":0.01307383,"low":0.01290545,"open":0.01301306,"close":0.01294501,"volume":24.56854066,"quoteVolume":1894.35815331,"weightedAverage":0.01296932},{"date":1546545600,"high":0.01304533,"low":0.01290801,"open":0.01294501,"close":0.0129384,"volume":25.84994651,"quoteVolume":1996.31989333,"weightedAverage":0.01294879},{"date":1546560000,"high":0.01304456,"low":0.01291751,"open":0.01294203,"close":0.01293006,"volume":24.69899588,"quoteVolume":1906.56640573,"weightedAverage":0.0129547},{"date":1546574400,"high":0.01317,"low":0.01292005,"open":0.0129301,"close":0.01309309,"volume":17.05415543,"quoteVolume":1307.2199068,"weightedAverage":0.01304612},{"date":1546588800,"high":0.0131965,"low":0.01301421,"open":0.01309309,"close":0.013102,"volume":18.51389502,"quoteVolume":1416.80141678,"weightedAverage":0.01306738},{"date":1546603200,"high":0.013304,"low":0.01294911,"open":0.01315083,"close":0.01322899,"volume":20.63029394,"quoteVolume":1574.23005377,"weightedAverage":0.013105},{"date":1546617600,"high":0.0132984,"low":0.01310965,"open":0.01322902,"close":0.01320501,"volume":19.06424701,"quoteVolume":1443.14755571,"weightedAverage":0.01321018},{"date":1546632000,"high":0.0132792,"low":0.01295671,"open":0.01319002,"close":0.01305004,"volume":24.87041766,"quoteVolume":1899.11915962,"weightedAverage":0.01309576},{"date":1546646400,"high":0.01327921,"low":0.01304031,"open":0.01305003,"close":0.01319001,"volume":16.09959947,"quoteVolume":1221.53356545,"weightedAverage":0.01317982}]

// Transform the data so that it fits the required format
let deltaSecond = data[1]["date"] - data[0]["date"];
let candlesticks = data.map(x => {
    x.date = new Date(x.date * 1000);
    x.deltaSecond = deltaSecond;
    return x;
})
let pointList = candlesticks.map(x => {return {x: x.date.getTime(), y: x.weightedAverage}});
let bandStepList = candlesticks.map(x => {return {x: x.date.getTime(), top: x.high, bottom:x.low}});
let barList = candlesticks.map(x => {return {x: x.date.getTime(), y: x.volume, delta:deltaSecond * 1000}});

// Define all layers
let candlestickLayer = new SimpleTimeChart.CandlestickLayer(candlesticks, {
    neutralColor: "#D0D0D0",
    greenColor: "#038C3E",
    redColor: "#BF452A",
    opacity: 1,
    shadowThickness: 1,
});
let lineLayer = new SimpleTimeChart.LineLayer(pointList, {
    color: "#ff0",
    thickness: 2,
    opacity: 1,
})
let bandLayer = new SimpleTimeChart.BandLayer(bandStepList, {
    color: "#FFFFFF",
    opacity: 0.2,
});
let histLayer = new SimpleTimeChart.HistogramLayer(barList, {
    color: "#FFFFFF",
    opacity: 0.5,
});

// Add Layers to the Chart you want
chart.addLayer(candlestickLayer);
secondChart.addLayer(lineLayer);
secondChart.addLayer(bandLayer);
volumeChart.addLayer(histLayer);

chartContainer.setTimeScale(
    SimpleTimeChart.Util.getTimeScaleFromLayer(chart, candlestickLayer)
);

chart.setDataScale(
    SimpleTimeChart.Util.getDataScaleFromLayer(chart, candlestickLayer)
);
secondChart.setDataScale(
    SimpleTimeChart.Util.getDataScaleFromLayer(secondChart, lineLayer)
);
volumeChart.setDataScale(
    SimpleTimeChart.Util.getDataScaleFromLayer(volumeChart, histLayer, 5)
);


chartContainer.draw();