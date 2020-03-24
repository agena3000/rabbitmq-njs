exports.server = (connection, queue, processMessageResponse) => connection
    .createChannel()
    .then(channel => {          
        channel.assertQueue(queue, {
            durable: false
        })
        channel.prefetch(1)
        channel.consume(queue, function reply(msg) {
            messageResponse = processMessageResponse(msg)
            if (!(typeof messageResponse === 'string' || messageResponse instanceof String)) {
                throw "The handle function of your RPC server has to return a string, "+typeof messageResponse +" found"
            }
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(messageResponse), {
                correlationId: msg.properties.correlationId
            })
            channel.ack(msg)
        })
    })

exports.client = (connection, queue, message) =>  new Promise((resolve, reject) => connection
    .createChannel()
    .then(channel => { channel
        .assertQueue('', {
             exclusive: true
        })
        .then(q => {
            var correlationId = generateUuid()
            channel
                .consume(q.queue, msg => {
                    if (msg.properties.correlationId == correlationId) {
                        resolve(msg)
                        setTimeout(() => { 
                            connection.close()
                            process.exit(0) 
                        }, 500)
                    }
                }, {
                    noAck: true
                })
            channel
                .sendToQueue(queue, Buffer.from(message), { 
                    correlationId: correlationId, 
                    replyTo: q.queue
                });
        })
    })
)

function generateUuid() {
    return Math.random().toString() +
           Math.random().toString() +
           Math.random().toString()
  }