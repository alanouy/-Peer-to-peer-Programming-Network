var singleton = require('../Singleton');
   
const fs = require('fs');
var net = require('net');
const args = require('minimist')(process.argv.slice(2));
var listofPeers = require('./peerList');


module.exports = {
    handleClientJoining: function (sock, serverPORT, parentFolder) {
        
        singleton.getTick();
        var clientTimeStamp = singleton.getTimestamp();

        
        //gets data from client, runs function 'checkData'
        sock.on('data', checkData);



        sock.on('close', function() {
            console.log('CLOSED');
        });

        

        //data gets sent here, parse it, then check
        function checkData(data) {  
            if(data.readUIntBE(0,3) == 3314){
                var version = data.readUIntBE(0,3);

            }else {
                console.log('error: wrong version number');
            }
            var incomingPeer = data.slice(3,5).readUIntBE(0,2);
            console.log('\nConnected from 127.0.0.1:' + incomingPeer);

            if(listofPeers.peerListIsFull() == false){
                listofPeers.peerJoining(incomingPeer);

                data.writeUIntBE(serverPORT,3,2);
                var bufferport = Buffer.from(parentFolder, 'utf-8');
                var dataBuffer = Buffer.concat([data, bufferport]);
                sock.write(dataBuffer);

            }else{
                console.log('Peer table full: 127.0.0.1:' + incomingPeer + ' redirected');
                sock.write(Buffer.from('redirected', 'utf-8'));
            }


         
        }
        
    }
};


