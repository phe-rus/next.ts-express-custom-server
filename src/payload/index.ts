import express from 'express';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let dev = process.env.NODE_ENV !== 'production';
let app = next({ dev });
let handle = app.getRequestHandler();
let port = process.env.PORT || 3000;

app.prepare().then(() => {
    let server = express();
    let httpsReq = createServer(server);
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // headers
    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });

    // testing api routes
    server.get('/api/route', (req, res) => {
        res.json({ message: 'Api serving successfully' });
    });

    // serving your fontend next js
    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    });

    httpsReq.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});