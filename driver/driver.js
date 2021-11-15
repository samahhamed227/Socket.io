'use strict';


const clientIo = require('socket.io-client');

let host = 'http://localhost:3000/caps';

const socket = clientIo.connect(host);

socket.on('picking-up',payload =>{
    
    setTimeout(()=>{
        console.log('DRIVER: picked up',payload.orderId);
        socket.emit('in-transit',payload);
    },1000);
    
    setTimeout(()=>{
        console.log('DRIVER: delivered up',payload.orderId);
        socket.emit('delivered',payload);
    },3000);
})