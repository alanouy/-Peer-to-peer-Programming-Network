var singleton = require('../Singleton');
var net = require('net');

var peerListArray = new Array(0,0);

module.exports = {
    //check if the peerlist is full or not
    peerListIsFull: function(){

        if(peerListArray[0] == 0 || peerListArray[1] == 0){
            return false;
        }
        else{
            return true;
        }
    },
    // get the port and the address, add it to an array
    peerJoining: function (incPeer) {
        if(peerListArray[0] == 0){
            peerListArray[0] = incPeer;
        }else {
            peerListArray[1] = incPeer;
        }
        return peerListArray;
    }
}
