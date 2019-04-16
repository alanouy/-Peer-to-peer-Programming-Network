var net = require('net');
var fs = require('fs');
var getpeerbuffer = require('./peerbuffer');
let handler = require('./peerHandler');
var singleton = require('../Singleton');

const args = require('minimist')(process.argv.slice(2));

singleton.init();

// getting the parent file directory
var path = require('path');
var currentFolder = path.dirname(__filename).split("\\");
var folderLength = currentFolder.length - 1;
var parentFolder = currentFolder[folderLength];


var client = new net.Socket();
var randomPort = Math.round(Math.random() * (65535 - 1) + 1);

var serverHOST = '127.0.0.1';
var serverPORT = randomPort;

let peerServer = net.createServer();
peerServer.listen(serverPORT, serverHOST);
peerServer.on('connection', function(sock){
    handler.handleClientJoining(sock, serverPORT, parentFolder); //called for each client joining

});


if(typeof(args.v) && typeof(args.n) && typeof(args.s) === 'undefined'){
    console.log('this peer address is ' + serverHOST + ':' + serverPORT + ' located at ' + parentFolder);

    // peerServer.on('connection', function(sock){
    //     handler.handleClientJoining(sock, serverPORT, parentFolder); //called for each client joining

    // });
    
    
} else{
    const args = require('minimist')(process.argv.slice(2));
    var server = args.s.split(":");
    var version = args.v;
    var maxNum = args.n;

    var HOST = server[0];
    var PORT = server[1];


//---------------------------------------CLIENT---------------------------------------------------------------

client.connect(PORT,HOST,function(){
    console.log('\nConnected to peer ' + HOST + ':' + PORT + ' at timestamp: ' + singleton.getTimestamp());
    console.log('\nThe peer address is: ' + serverHOST + ':' + serverPORT + ' located at ' + parentFolder);

    // write in the port, version, 
    client.write(getpeerbuffer.getpacket(version, serverPORT));
    //gets stored in data, sent out to SERVER/CLIENTHANDLER
});


// recieves the data back from clientHandler/SERVER
client.on('data', function(data) {

    // if we get 'redirected' back from the server, it will end
    if(data.toString() == 'redirected'){
        client.end();
        peerServer.close();
        
    // else it will show the ack
    }else{
        console.log('Received ack from ' + data.slice(5,7).toString() + ':' + data.slice(3,5).readUIntBE(0,2));
    }
});

client.on('close', function(data) {
    console.log('Connection closed');
});
}
