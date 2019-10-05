import * as express from 'express';
import * as http from 'http';
import { RequestHandler } from 'express-serve-static-core';

let app = express();

/************************************************************************
 *  Variables
 ************************************************************************/
let port = 8088;
let server: http.Server;
init();

/************************************************************************
 * Module functions
 ************************************************************************/
export function bindGet(url, callback: express.RequestHandler) {
    app.get(url, (req, res, next) => {
        callback(req, res, next);
    });
};

export function bindPost(url, callback: RequestHandler) {
    app.post(url, (req, res, next) => {
        callback(req, res, next);
    });
}

/***********************************************************************
* Internal methods
***********************************************************************/
function init() {
    server = http.createServer(app);

    // Start server 
    app.set('port', port);
    server.listen(port, 'localhost');
    server.on('error', onError);

    // Config server
    app.use(express.json());
    server.on('listening', onListening);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'pipe ' + port
        : 'port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        case 'ECONNRESET':
            console.error('Socket hang up');
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr: any = server.address();
    console.log("Server started. Listening on " + addr.address + ":" + addr.port);
}