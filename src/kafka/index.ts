import * as Koa from "koa";

// interface InitTopicsInput {
//   kafka: Kafka;
//   config: any;
// }

// const initTopics: any({ kafka, config}: InitTopicsInput) {

// };

// TODO: example of send
// TODO: example of receive

export function listen() {
  const run = async (app: Koa) => {
    const kafka = app.context.kafka;
    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: "recognition-group" });

    // Producing
    await producer.connect();
    await producer.send({
      topic: "test-topic",
      messages: [{ value: "Recognition app" }]
    });

    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString()
        });
      }
    });
  };
}
