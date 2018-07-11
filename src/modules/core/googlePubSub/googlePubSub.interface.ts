export interface GooglePubSubMessage {
  id: string;
  ackId: string;
  data: string;
  attributes: any;
  timestamp: Date;

  ack();
  nack();

  // message.id = ID of the message.
  // message.ackId = ID used to acknowledge the message receival.
  // message.data = Contents of the message.
  // message.attributes = Attributes of the message.
  // message.timestamp = Timestamp when Pub/Sub received the message.

  // Ack the message:
  // message.ack();

  // This doesn't ack the message, but allows more messages to be retrieved
  // if your limit was hit or if you don't want to ack the message.
  // message.nack();
}
