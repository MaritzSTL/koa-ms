import {Kafka} from "kafkajs"

interface InitTopicsInput {
  kafka: Kafka;
  config: any;
}
const initTopics: any({ kafka, config}: InitTopicsInput) {

};

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "recognition-group" });

// TODO: example of send
// TODO: example of receive

const run = async () => {
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
    eachMessage: async ({ topic, partition, message }: { topic: }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    }
  });
};
