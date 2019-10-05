import * as net from 'net';

/************************************************************************
 *  Variables
 ************************************************************************/
let port = 53333;
let url: 'localhost';


/************************************************************************
 * Module functions
 ************************************************************************/
export function send(data: string) {
    let client = init();
    client.on('ready', function() {
        console.log("Sending...");
        client.write(data + "\r\n"); // Gotta close the request with CRLF
    });
};

/***********************************************************************
* Internal methods
***********************************************************************/
function init() {
    let client = new net.Socket();
    client.connect(port, url, function() {
        console.log('Connecting...');
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('error', function(err) {
        console.log(err);
        client.destroy();
    })

    client.on('close', function() {
        console.log('Connection closed');
    });
    return client;
}