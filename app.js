var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');  

var app = express();

var AddrChngPrtl_StCstmDocs = [
    {name: "ADDR_CHG_LOGIN_HDR_1"},
    {name: "ADDR_CHG_HDR_1"}
];

var AddrChngPrtl_Fields = [
    {name: 'Font', id: 'font-family', type: 'select', options: ['Georgia, serif','Helvetica, sans-serif','Courier, monospace']},
    {name: 'Background Color', id: 'background-color', class: 'color-picker'},
    {name: 'Container Color', id: 'container-color', class: 'color-picker'},
    {name: 'Container Width', id: 'container-width', help: 'e.x. 960px'},
    {name: 'Title Text Size', id: 'title-text-size', help: 'e.x. 50px or 150%'},
    {name: 'Title Text Color', id: 'title-text-color', class: 'color-picker'},
    {name: 'Title Background Color', id: 'title-background-color', class: 'color-picker'},
    {name: 'Header Text Size', id: 'header-text-size', help: 'e.x. 30px or 130%'},
    {name: 'Header Text Color', id: 'header-text-color', class: 'color-picker'},
    {name: 'Header Background Color', id: 'header-background-color', class: 'color-picker'},
    {name: 'Section Text Size', id: 'section-text-size', help: 'e.x. 24px or 110%'},
    {name: 'Section Text Color', id: 'section-text-color', class: 'color-picker'},
    {name: 'Section Background Color', id: 'section-background-color', class: 'color-picker'},
    {name: 'Label Text Size', id: 'label-text-size', help: 'e.x. 24px or 110%'},
    {name: 'Label Text Color', id: 'label-text-color', class: 'color-picker'},
    {name: 'Label Background Color', id: 'label-background-color', class: 'color-picker'},
    {name: 'Link Text Color', id: 'link-text-color', class: 'color-picker'},
    {name: 'State Banner URL', id: 'state-banner-url', help: 'http://www.vertafore.com/logo.png'},
    {name: 'Portal Title', id: 'portal-title', help: 'e.x. Address Change Portal'}
];


var IRO_StCstmDocs = [
    {name: "IROPRTL_COMN_HEAD"}
];

var IRO_Fields = [
    {name: 'Font', id: 'font-family', type: 'select', options: ['Georgia, serif','Helvetica, sans-serif','Courier, monospace']},
    {name: 'Background Color', id: 'background-color', class: 'color-picker'},
    {name: 'Container Color', id: 'container-color', class: 'color-picker'},
    {name: 'Container Width', id: 'container-width', help: 'e.x. 960px'},
    {name: 'Section Text Size', id: 'section-text-size', help: 'e.x. 24px or 110%'},
    {name: 'Section Text Color', id: 'section-text-color', class: 'color-picker'},
    {name: 'Section Background Color', id: 'section-background-color', class: 'color-picker'},
    {name: 'Label Text Size', id: 'label-text-size', help: 'e.x. 24px or 110%'},
    {name: 'Label Text Color', id: 'label-text-color', class: 'color-picker'},
    {name: 'Label Background Color', id: 'label-background-color', class: 'color-picker'}
];

var DocSub_StCstmDocs = [
    {name: "SUB_FIL_DOC_HDR_1"},
    {name: "SBMT_FIL_DOC_LOGIN_HDR_1"}
]

var DocSub_Fields = [
    {name: 'Font', id: 'font-family', type: 'select', options: ['Georgia, serif','Helvetica, sans-serif','Courier, monospace']},
    {name: 'Background Color', id: 'background-color', class: 'color-picker'},
    {name: 'Container Color', id: 'container-color', class: 'color-picker'},
    {name: 'Container Width', id: 'container-width', help: 'e.x. 960px'}
];

// all environments
app.set('port', process.env.PORT || 8080);
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));
app.use(function(req,res) {res.render('404', {path: req.path});} );

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res) {
    res.render('index', {path: req.path })
});
app.get('/users', user.list);
app.get('/addressChange', function(req,res) {
    res.render('portalConfig', {
        fields: AddrChngPrtl_Fields, 
        docs: AddrChngPrtl_StCstmDocs,
        path: req.path
    })
});
app.get('/addressChange/maintain', function(req,res) {
    res.render('portalMaintenance', {
        fields: AddrChngPrtl_Fields,
        docs: AddrChngPrtl_StCstmDocs,
        path: req.path
    });
});
app.get('/iro', function(req,res) {
    res.render('portalConfig', {
        fields: IRO_Fields, 
        docs: IRO_StCstmDocs,
        path: req.path
    })
});
app.get('/docsub', function(req,res) {
    res.render('portalConfig', {
        fields: DocSub_Fields, 
        docs: DocSub_StCstmDocs,
        path: req.path
    })
});
app.get('/prsr', function(req,res) {
    res.render('prsr', {path: req.path})
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
