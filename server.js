var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2] || 80

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method
  console.log(query)

  /******** 从这里开始看，上面不要看 ************/

  console.log('超哥说：含查询字符串的路径\n' + pathWithQuery);

  if (path === '/' || path === '/index') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    let string = fs.readFileSync('./public/index.html').toString()
    const page1 = fs.readFileSync('./db/page1.json').toString()
    const result = JSON.parse(page1).map(item => `<li>${item.id}</li>`).join('')
    string = string.replace('{{div}}', `<ul id="ulWrap">${result}</ul>`)
    response.write(string)
    response.end();
  } else if (path === '/index.html') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const string = fs.readFileSync('./public/index.html')
    response.write(string)
    response.end();
  } else if (path === '/style.css') {
    response.setHeader('Content-Type', 'text/css; charset=utf-8');
    const string = fs.readFileSync('./public/style.css')
    response.write(string)
    response.end();
  } else if (path === '/main.js') {
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    const string = fs.readFileSync('./public/main.js')
    response.write(string);
    response.end();
  } else if (path === '/main2.js') {
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    const string = fs.readFileSync('./public/main2.js')
    response.write(string);
    response.end();
  } else if (path === '/index2.html') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const string = fs.readFileSync('./public/index2.html')
    response.write(string);
    response.end();
  } else if (path === '/1.xml') {
    response.setHeader('Content-type', 'text/xml; charset=utf-8');
    const string = fs.readFileSync('./public/1.xml')
    response.write(string)
    response.end()
  } else if (path === '/1.json') {
    response.setHeader('Content-type', 'application/json; charset=utf-8')
    const string = fs.readFileSync('./public/1.json')
    response.write(string)
    response.end()
  } else if (path === '/page2.json') {
    response.setHeader('Content-type', 'application/json; charset=utf-8')
    const string = fs.readFileSync('./db/page2.json')
    response.write(string)
    response.end()
  } else if (path === '/page3.json') {
    response.setHeader('Content-type', 'application/json; charset=utf-8')
    const string = fs.readFileSync('./db/page3.json')
    response.write(string)
    response.end()
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end();
  }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请在浏览器里打开 http://localhost:' + port)