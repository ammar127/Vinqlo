let mongoose = require("mongoose");
let Notification = require('../models/notification');
const sendNotification = (notification) => {
    //create notification object here
    //smartupSocket.emit('notification'+sentTo.email);
    
    notification.save().then(doc => {
            // TODO check here if user is online
        });
    
    
};

module.exports = { 
    sendNotification
};
