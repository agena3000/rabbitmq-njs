# rabbitmq-njs

Provide functions for RabbitMQ processes based on amqplib connection.

https://www.npmjs.com/package/@agena3000/rabbitmq-njs

# Usage
Import the package.

```
npm i @agena3000/rabbitmq-njs
```

```js
var a3rmq = require('@agena3000/rabbitmq-njs')
```

## Publisher
```js
var queue = 'test-queue'
amqp
    .connect("amqp://admin:admin@rabbitmq.host")
    .then(con => a3rmq
    .publish(con, queue, "message")
    )
```

## Consumer
```js
var queue = 'test-queue'
amqp
    .connect("amqp://admin:admin@rabbitmq.host")
    .then(con => a3rmq
    .consume(con, queue, msg => {
        console.log(msg.content.toString())
    })
    )
```

# RPC (Remote Procedure Call) : request / response
## Server
```js
var queue = 'rpc-queue'
a3rmq
    .connect("amqp://admin:admin@docker.agena3000.com:50020")
    .then(con => a3rmq
        .rpcServer(con, queue, msg => {
            // Handle request function has to return a String
            console.log("Received :",msg.content.toString())
            return Math.pow(parseInt(msg.content.toString()), 2).toString()
        })
    )
```

## Client
```js
var queue = 'rpc-queue'
a3rmq
    .connect("amqp://admin:admin@docker.agena3000.com:50020")
    .then(con => a3rmq
        .rpcClient(con, queue, "2")
        .then(res => {
            // Handle response
            console.log("Res : ", res.content.toString())
        })
    )
```

# About Agena3000
https://www.agena3000.com