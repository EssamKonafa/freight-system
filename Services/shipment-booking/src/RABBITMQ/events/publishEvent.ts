import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost";
const EXCHANGE_NAME = "microservices_events";

export async function publishEvent(eventType: string, data: object) {
    let connection:any, channel:any;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

        channel.publish(EXCHANGE_NAME, eventType, Buffer.from(JSON.stringify(data)), {
            persistent: true,
        });

        console.log(`Event Published: ${eventType}`, data);
    } catch (error) {
        console.error("Error publishing event:", error);
    } finally {
        setTimeout(() => {
            if (channel) channel.close();
            if (connection) connection.close();
        }, 500);
    }
}
