const http = require('http');
const { parse } = require('querystring')
const hostname = '127.0.0.1';
const port = 3000;
let users = [
    {name: 'Name1'},
    {name: 'Name2'},
    {name: 'Name3'}
];

const server = http.createServer((req, res) => {

    if (req.url === '/users'){
        if(req.method == 'GET'){
            res.writeHead(200, 
                {'Content-Type': 'text/plain'}    
            )
            res.end(JSON.stringify(users));
        } else if (req.method == 'POST'){
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let params = JSON.parse(JSON.stringify(parse(body)));
                users.push(params);
                res.end('ok');
            })
        } else if (req.method == 'PUT'){
            users = [];    
            res.end('ok');
        } else {
            res.end('Method absent');
        }
    } else {
        res.end ('Server working...');
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
