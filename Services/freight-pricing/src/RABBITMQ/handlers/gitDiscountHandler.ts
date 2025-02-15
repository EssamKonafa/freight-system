import amqp from 'amqplib';

export async function getDiscountHandler(userId: string): Promise<number> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'discount_request';
    
    const { queue: replyQueue } = await channel.assertQueue('', { exclusive: true });

    return new Promise((resolve, reject) => {
        const correlationId = Math.random().toString();
        
        channel.consume(replyQueue, (message:any) => {
            if (message.properties.correlationId === correlationId) {
                const response = JSON.parse(message.content.toString());
                resolve(response.discount);
                channel.close();
            }
        }, { noAck: true });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId })), {
            correlationId,
            replyTo: replyQueue
        });
    });
}