import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost";
const EXCHANGE_NAME = "microservices_events";

let connection: any, channel: any;

async function ensureConnection() {
    if (!connection) {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });        
    }
}

export async function subscribeEvent(eventType: string, callback: (data: any) => void) {
    try {
        await ensureConnection();
        const queue = await channel.assertQueue("", { exclusive: true });
        await channel.bindQueue(queue.queue, EXCHANGE_NAME, eventType);

        console.log(`Subscribed to ${eventType} events`);

        channel.consume(queue.queue, (message:any) => {
            if (message) {
                const data = JSON.parse(message.content.toString());
                console.log(`Received Event: ${eventType}`, data);
                callback(data);
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error("Error subscribing to event:", error);
    }
}

