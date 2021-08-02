let mongoose = require("mongoose");
let Notification = require('../models/notification');
const sendNotification = (notification) => {
    //smartupSocket.emit('notification'+sentTo);
    
    notification.save().then(doc => {
            // TODO check here if user is online
        });
    
    
};

module.exports = { 
    sendNotification
};
