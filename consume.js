exports.consume = (connection, queue) => new Promise((resolve, reject) => connection
    .createChannel()
    .then(ch => ch
        .assertQueue(queue)
        .then(() => ch
            .consume(queue, (msg) => {
                if (msg !== null) {
                    resolve(msg)
                    ch.ack(msg)
                } else {
                    reject()
                }
            })
        )
    )
)