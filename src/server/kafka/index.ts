import { Kafka } from "kafkajs";
import { AppConfig } from "../../lib/config";

let kafka: Kafka | undefined;

const initKafka = ({ KAFKA_CLIENT_ID, KAFKA_BROKERS }: AppConfig): Kafka => {
  if (!kafka) {
    kafka = new Kafka({
      clientId: KAFKA_CLIENT_ID,
      brokers: KAFKA_BROKERS
    });
  }
  return kafka;
};

export { initKafka, Kafka };
