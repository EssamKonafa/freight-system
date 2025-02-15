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

export async function publishEvent(eventType: string, data: object) {
    try {
        await ensureConnection();
        channel.publish(EXCHANGE_NAME, eventType, Buffer.from(JSON.stringify(data)), {
            persistent: true,
        });
        console.log(`Event Published: ${eventType} from registration-service`, data);
    } catch (error) {
        console.error("Error publishing event:", error);
    }
}

// export async function publishEvent(eventType: string, data: object) {
//     let connection:any, channel:any;
//     try {
//         connection = await amqp.connect(RABBITMQ_URL);
//         channel = await connection.createChannel();

//         await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

//         channel.publish(EXCHANGE_NAME, eventType, Buffer.from(JSON.stringify(data)), {
//             persistent: true,
//         });

//         console.log(`Event Published: ${eventType} from referral-link service`, data);
//     } catch (error) {
//         console.error("Error publishing event:", error);
//     } finally {
//         setTimeout(() => {
//             if (channel) channel.close();
//             if (connection) connection.close();
//         }, 500);
//     }
// }
