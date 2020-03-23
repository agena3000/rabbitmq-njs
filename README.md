# rabbitmq-njs

Provide functions for RabbitMQ processes based on amqplib connection

# Usage

```js
var amqp = require('amqplib')
var a3rmq = require('@agena3000/rabbitmq-njs')

var queue = 'test-queue'
 
// Publisher
amqp
.connect("amqp://admin:admin@docker.agena3000.com:50020")
.then(conn => a3rmq
  .publish(conn, queue, JSON.stringify({
    item: "test",
    id: 2,
    array: [ "el1", "el2" ]
  }))
)
.catch(console.warn)
 
// Consumer
amqp
.connect("amqp://admin:admin@docker.agena3000.com:50020")
.then(conn => a3rmq
  .consume(conn, queue, msg => {
      console.log(JSON.parse(msg.content.toString()))
  })
  .catch(console.warn)
)
.catch(console.warn)
```