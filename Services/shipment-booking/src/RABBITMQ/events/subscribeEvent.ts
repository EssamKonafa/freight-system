import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost";
const EXCHANGE_NAME = "microservices_events";

export async function subscribeEvent(eventType: string, callback: (data: any) => void) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

        const queue = await channel.assertQueue("", { exclusive: true });

        await channel.bindQueue(queue.queue, EXCHANGE_NAME, eventType);

        console.log(`Subscribed to ${eventType} events`);

        channel.consume(queue.queue, (message) => {
            if (message) {
                const data = JSON.parse(message.content.toString());
                console.log(`Received Event: ${eventType}`, data);
                callback(data);
                channel.ack(message);
            }
        })
    } catch (error) {
        console.error("Error subscribing to event:", error);
    }
}
