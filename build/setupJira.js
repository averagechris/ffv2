var dom = window.parent.document;
var link = dom.createElement('link');
link.href = "https://rawgit.com/mistahchris/ffv2/master/build/static/css/main.js";
dom.head.appendChild(link);

var div = dom.createElement('div');
div.id = "root";
dom.body.appendChild(div);

var script = dom.createElement('script');
script.src = "https://rawgit.com/mistahchris/ffv2/master/build/static/js/main.js";
dom.body.appendChild(script);
