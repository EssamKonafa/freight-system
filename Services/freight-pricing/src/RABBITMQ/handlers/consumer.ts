import amqp from "amqplib";
import PricingModel from "../../models/pricing";
import RouteModel from "../../models/route";

//received messages
async function handleUserRegistered(data: any) {
try{
    // Trigger shipping price calculation
    console.log(`User ${data.userId} has a referral code: ${data.referralCode}`);
    const routePricing = await RouteModel.findOne({uerId:data.userId})
    if (routePricing) {
        routePricing.totalPrice -= 0.01;
        routePricing.isDiscounted=true;
        await routePricing.save();

        console.log(`Discount applied: New total price is ${routePricing.totalPrice}`);
    } else {
        console.log(`No existing route pricing found for user ${data.userId}`);
    }
    
} catch (error) {
    console.error("Error processing user registration event:", error);
}
}

export async function startConsumer() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        const exchange = "microservices_events";
        const queue = "shipping_price_queue";
        const routingKey = "user.discount";

        await channel.assertExchange(exchange, "direct", { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);

        console.log("Shipping service is waiting for events...");

        channel.consume(queue, async (msg) => {
            if (msg) {
                const data = JSON.parse(msg.content.toString());
                await handleUserRegistered(data);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("Failed to start consumer:", error);
    }
}