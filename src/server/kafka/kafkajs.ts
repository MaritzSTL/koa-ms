const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'recognition-service',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'recognition-group' });

const run = async () => {
    // Producing
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Recognition app' },
        ],
    });

    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
};

run().catch(console.error);