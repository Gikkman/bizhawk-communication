import * as net from 'net';

/************************************************************************
 *  Variables
 ************************************************************************/
let port = 53333;
let url = 'localhost';

let server: net.Server;
let connection: net.Socket;
init();

/************************************************************************
 * Module functions
 ************************************************************************/
export function send(data: string) {
    if(connection && !connection.destroyed) {
        console.log("Sending...");
        connection.write(data + "\r\n"); // Gotta close the request with CRLF
    }
};

/***********************************************************************
* Internal methods
***********************************************************************/
function init() {
    server = new net.Server();
    server.listen(port, url);

    server.on('listening', function() {
        let address = server.address() as net.AddressInfo; 
        console.log("Server listening on " + address.address + ":" + address.port);
    });

    server.on('connection', function(client) {
        console.log('Connection detected!');
        configConnection(client);
        connection = client;
    });

    server.on('error', function(err) {
        console.log(err);
    })

    server.on('close', function() {
        console.log('Server closed');
    });
}

function configConnection(client: net.Socket) {
    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.write("ACK" + "\r\n")
        client.destroy(); 
        console.log('Client destroyed');
    });

    client.on('error', function(err) {
        console.log(err);
        client.destroy();
    })

    client.on("timeout", function() {
        console.log("Client timeout");
    });

    client.on("end", function() {
        console.log("Client ended");
    });

    client.on('close', function() {
        console.log('Client connection closed');
    });
}