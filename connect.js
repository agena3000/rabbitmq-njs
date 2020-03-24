amqplib = require('amqplib')

exports.connect = uri => amqplib
    .connect(uri)