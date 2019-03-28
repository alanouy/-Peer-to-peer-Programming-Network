const fs = require('fs');

module.exports = {


    init: function( ) {
    },

    getpacket: function(version, portnumber) {
        var buffer1 = Buffer.alloc(3);
        buffer1.writeUIntBE(version,0,3);
        var bufferport = Buffer.alloc(2);
        bufferport.writeUIntBE(portnumber,0,2);
        var dataBuffer = Buffer.concat([buffer1, bufferport]);
        return dataBuffer;
    }
};

