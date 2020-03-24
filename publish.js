exports.publish = (connection, queue, message) => connection
    .createChannel()
    .then(ch => ch
        .assertQueue(queue)
        .then(() => ch.sendToQueue(queue, Buffer.from(message)))
    )