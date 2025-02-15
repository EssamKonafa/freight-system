import amqp from 'amqplib';
import ReferralLinkModel from '../../models/referral-link';

export async function startDiscountHandler() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    const queue = 'discount_request';
    await channel.assertQueue(queue, { durable: false });

    console.log("[Referral Service] Waiting for discount requests...");
    
    channel.consume(queue, async (message:any) => {
        const request = JSON.parse(message.content.toString());
        console.log("[Referral Service] Received request for user:", request.userId);

        let discount = 0;
        const referral = await ReferralLinkModel.findOne({ referredUser: request.userId });
        if (referral) discount = 0.01;

        channel.sendToQueue(
            message.properties.replyTo,
            Buffer.from(JSON.stringify({ discount })),
            { correlationId: message.properties.correlationId }
        );

        channel.ack(message);
    });
} 