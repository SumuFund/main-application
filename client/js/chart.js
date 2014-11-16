
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

$( document ).ready(function() {
  //Chart.defaults.global = {
  //  scaleFontFamily : "'Montserrat', sans serif"
  //}
  Chart.defaults.global.scaleFontFamily = "Montserrat";
  Chart.defaults.global.tooltipFontFamily = "Montserrat";
  Chart.defaults.global.tooltipTitleFontFamily = "Montserrat";

  var prefSlider = $("#PerfSlider");

  prefSlider.simpleSlider({
    range : [1,6],
    step : 1,
    snap : true
  });

  var inView = false;
  var ginView = false;
  var sinView = false;
  var cinView = false;
  var pinView = false;

  function updatePrefGraph (sliderVal) {
    for (var i = 0; i < prefMetricsLength; i++) {
      prefMetrics.datasets[0].points[i].value = prefData[sliderVal - 1][i];
    }
    prefMetrics.update();
  }

  function animateSlider(val) {
    prefSlider.simpleSlider("setValue", val);
  }

  prefSlider.bind("slider:changed", function (event, data) {
    updatePrefGraph(data.value);
  });

  //Get the context of the canvas element we want to select
  var prefCtx = document.getElementById("PerfChart").getContext("2d");
  var prefMetrics = new Chart(prefCtx).Radar(prefChart, {
    // Boolean - If we want to override with a hard coded scale
    scaleOverride: true,
    pointLabelFontFamily : "Montserrat",

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: 5,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: 1,
    // Number - The scale starting value
    scaleStartValue: 0,
    scaleShowLabels : true,
  });

  var prefMetricsLength = prefMetrics.datasets[0].points.length;

  var animateCounter = 0;

  var interval = setInterval(function() {
    animateSlider(animateCounter);
    animateCounter++;
    if(animateCounter === 7) {
      clearInterval(interval);
    }
  }, 300);

  $(window).scroll(function() {
      if (isScrolledIntoView('#Growth')) {
        if (ginView) { return; }
        ginView = true;
        var growthCtx = document.getElementById("Growth").getContext("2d");
        var growthChart = new Chart(growthCtx).Line(growth, null);
      }

      else if (isScrolledIntoView('#StaffSize')) {
        if (sinView) { return; }
        sinView = true;
        var staffCtx = document.getElementById("StaffSize").getContext("2d");
        var staffChart = new Chart(staffCtx).Bar(staffSize, null);
      }

      else if (isScrolledIntoView('#Capitalization')) {
        if (cinView) { return; }
        cinView = true;
        var capitalCtx = document.getElementById("Capitalization").getContext("2d");
        var capitalChart = new Chart(capitalCtx).Line(capitalization, {
          bezierCurve : false,
        });
      }

      else if (isScrolledIntoView('#Pipeline')) {
        if (pinView) { return; }
        pinView = true;
        var pipelineCtx = document.getElementById("Pipeline").getContext("2d");
        var pipelineChart = new Chart(pipelineCtx).Line(pipeline, null);
      }

    });

    //var ipCtx = document.getElementById("IP").getContext("2d");
    //var ipChart = new Chart(ipCtx).Line(ip, null);

    //var sphereCtx = document.getElementById("Sphere").getContext("2d");
    //var sphereChart = new Chart(sphereCtx).Line(growth, null);

    //var centerCtx = document.getElementById("Center").getContext("2d");
    //var centerChart = new Chart(centerCtx).Line(growth, null);

    //var platformDevCtx = document.getElementById("PlatDev").getContext("2d");
    //var platformDevChart = new Chart(platformDevCtx).Line(growth, null);

});

var months = ["November","December","January","February","March","April"];
var users = [0, 5, 20, 40, 80, 140];
var revenue = [0, 0, 400, 800, 1600, 2800];
var staffSizeData = [1, 1, 2, 2, 3, 3];
var capitalData = [0, 0, 0, 0, 25000, 50000];
var pipelineData = [ 20, 30, 60, 70, 140, 200];

var growth = {
  labels : months,
  datasets : [
    {
      fillColor : "rgba(68,67,65,0.5)",
      strokeColor : "rgba(68,67,65,1)",
      pointColor : "rgba(68,67,65,1)",
      pointStrokeColor : "#fff",
      data : revenue
    },
    {
      fillColor : "rgba(33,54,108,0.5)",
      strokeColor : "rgba(33,54,108,1)",
      pointColor : "rgba(33,54,108,1)",
      pointStrokeColor : "#fff",
      data : users
    }
  ]
}

var staffSize = {
  labels : months,
  datasets : [
    {
      fillColor : "rgba(33,54,108,0.5)",
      strokeColor : "rgba(33,54,108,1)",
      pointColor : "rgba(33,54,108,1)",
      pointStrokeColor : "#fff",
      data : staffSizeData 
    }
  ]
}

var capitalization = {
  labels : months,
  datasets : [
    {
      label : "capital",
      fillColor : "rgba(33,54,108,0.5)",
      strokeColor : "rgba(33,54,108,1)",
      pointColor : "rgba(33,54,108,1)",
      pointStrokeColor : "#fff",
      data : capitalData
    },
    {
      label : "score",
      fillColor : "rgba(68,67,65,0.5)",
      strokeColor : "rgba(68,67,65,1)",
      pointColor : "rgba(68,67,65,1)",
      pointStrokeColor : "#fff",
      data : [1, 1, 1, 1, 2, 3] 
    }
  ]
}

var pipeline = {
  labels : months,
  datasets : [
    {
      fillColor : "rgba(33,54,108,0.5)",
      strokeColor : "rgba(33,54,108,1)",
      pointColor : "rgba(33,54,108,1)",
      pointStrokeColor : "#fff",
      data : pipelineData 
    }
  ]
}

var perfLabels = [
    "Staff Size",
    "Caplitalization",
    "Intellectual Property",
    "Sales Pipeline",
    "Sphere of Influence",
    "Platform Development"
    ];

var prefData = [
  [1, 1, 3, 2, 3, 3],
  [1, 1, 3, 2, 3, 3],
  [3, 1, 3, 4, 4, 3],
  [3, 1, 3, 4, 4, 4],
  [5, 2, 3, 4, 4, 4],
  [5, 3, 4, 5, 4, 5]
]

var prefChart = {
  labels: perfLabels,
  datasets: [
    {
      fillColor: "rgba(33,54,108,0.2)",
      strokeColor: "rgba(33,54,108,1)",
      pointColor: "#c09551",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(33,54,108,1)",
      data: prefData[0]
    },
  ]
};

