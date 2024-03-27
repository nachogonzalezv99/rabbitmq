import amqp from "amqplib";

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs"); //check if exists or create

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message!.content.toString());
      console.log(`Received job with input: ${input.number}`);

      if (input.number == 100) channel.ack(message!)
    });

    console.log("waiting for messages...");
  } catch (error) {
    console.log(error);
  }
}

connect();
