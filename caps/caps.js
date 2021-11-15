'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

const caps = io.of('/caps');

caps.on('connection',(socket)=>{
    console.log('Connect To vendor:',socket.id);

    socket.on('pickup',(payload)=>{
        let pickUpPayload={
            event:'pickup',
            time: new Date().toLocaleDateString(),
            payload
        }
        console.log('Event',pickUpPayload);
        caps.emit('picking-up',payload);
    });

    console.log('Connect To in-transit:',socket.id);
    socket.on('in-transit',(payload)=>{
        let inTransitPayload = {
            event:'in-transit',
            time:new Date().toLocaleDateString(),
            payload
        }
        console.log('Event',inTransitPayload);
    });

    console.log('Connect To driver:',socket.id);
    socket.on('delivered',(payload)=>{
        let delevveredPayload = {
            event:'delivered',
            time:new Date().toLocaleDateString(),
            payload
        };
        console.log('Event',delevveredPayload);
        caps.emit('delivering-it',payload);
    });
})


module.exports=caps