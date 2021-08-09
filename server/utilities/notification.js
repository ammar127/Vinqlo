let mongoose = require("mongoose");
let Notification = require('../models/notification');
const sendNotification = ({..}) => {
    //create notification object here

    vinqloSocket.emit('notification'+sentTo.email);

    
    notification.save().then(doc => {
            // TODO check here if user is online
        });
    
    
};

module.exports = { 
    sendNotification
};
