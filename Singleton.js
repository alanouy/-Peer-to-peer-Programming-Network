
// Some code needs to added that are common for the module
let currentTimeStamp = Math.round(Math.random() * (999 - 1) + 1);
const startTime = Date.now();
let sequenceNumber = Math.round(Math.random() * (999 - 1) + 1);
let miliseconds = 0;
let tick = 0;



module.exports = {
    init: function() {
       // init function needs to be implemented here //    

    },
    getTick: function(){
        miliseconds = Date.now() - startTime;
        tick = tick + miliseconds/10;
        tick = Math.round(tick);
        return tick;


    },

    //--------------------------
    //getSequenceNumber: return the current sequence number + 1
    //--------------------------
    getSequenceNumber: function() {
        sequenceNumber = sequenceNumber + 1;
        //console.log(sequenceNumber);

        return sequenceNumber;
    },

    //--------------------------
    //getTimestamp: return the current timer value
    //--------------------------
    getTimestamp: function() {
        return currentTimeStamp + tick;
    }


};