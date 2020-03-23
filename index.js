exports.publish = (connection, queue, message) => connection
    .createChannel()
    .then(ch => ch
        .assertQueue(queue)
        .then(() => ch.sendToQueue(queue, Buffer.from(message)))
    )

exports.consume = (connection, queue, callbackIfMessage, callbackIfNoMessage) => connection
    .createChannel()
    .then(ch => ch
        .assertQueue(queue)
        .then(() => ch
            .consume(queue, (msg) => {
                if (msg !== null) {
                    callbackIfMessage(msg)
                    ch.ack(msg)
                } else {
                    callbackIfNoMessage()
                }
            })
        )
    )