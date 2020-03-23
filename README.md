# rabbitmq-njs

Provide functions for RabbitMQ processes based on amqplib connection

# Usage

```js
var amqp = require('amqplib')
var a3rmq = require('@agena3000/rabbitmq-njs')

var queue = 'test-queue'
 
// Publisher
amqp
.connect("amqp://admin:admin@rabbitmq.host")
.then(conn => a3rmq
  .publish(conn, queue, "message"))
)
.catch(console.warn)
 
// Consumer
amqp
.connect("amqp://admin:admin@rabbitmq.host")
.then(conn => a3rmq
  .consume(conn, queue, msg => {
      console.log(msg.content.toString())
  })
  .catch(console.warn)
)
.catch(console.warn)
```