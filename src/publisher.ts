import amqp from "amqplib";

const msg = { number: process.argv[2] };

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs"); //check if exists or create

    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully: ${msg.number}`);
  } catch (error) {
    console.log(error);
  }
}


connect()