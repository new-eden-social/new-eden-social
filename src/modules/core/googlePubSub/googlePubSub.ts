import { Injectable, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  GOOGLE_PUB_SUB_PROVIDER,
  GOOGLE_PUB_SUB_TOPIC,
  GOOGLE_PUB_SUB_PUBLISHER_OPTIONS,
  GOOGLE_PUB_SUB_SUBSCRIBER_OPTIONS,
  GOOGLE_PUB_SUB_SUBSCRIPTION,
} from './googlePubSub.constants';
import { IEventPublisher } from '@nestjs/cqrs/dist/interfaces/events/event-publisher.interface';
import { IMessageSource } from '@nestjs/cqrs/dist/interfaces/events/message-source.interface';
import { IEvent } from '@nestjs/cqrs/dist/interfaces/events/event.interface';
import { Subject } from 'rxjs/Subject';
import * as PubSub from '@google-cloud/pubsub';
import { fromEvent } from 'rxjs';
import { GooglePubSubMessage } from './googlePubSub.interface';

@Injectable()
export class GooglePubSub implements IEventPublisher, IMessageSource, OnModuleInit, OnModuleDestroy
 {

  private events: PubSub.Subscription;

  constructor(
    @Inject(GOOGLE_PUB_SUB_PROVIDER)
    private googlePubSub: PubSub.PubSub,
    @Inject(GOOGLE_PUB_SUB_TOPIC)
    private topic: string,
    @Inject(GOOGLE_PUB_SUB_SUBSCRIPTION)
    private subscription: string,
    @Inject(GOOGLE_PUB_SUB_PUBLISHER_OPTIONS)
    private publisherOptions: PubSub.Topic.PublisherOptions,
    @Inject(GOOGLE_PUB_SUB_SUBSCRIBER_OPTIONS)
    private subscriberOptions: PubSub.Topic.SubscriptionOptions,
  ) {
  }

  async onModuleInit() {
    console.log('GooglePubSub Module initializing!');
    console.log(`Setting up topic: ${this.topic}`);
    await this.googlePubSub.createTopic(this.topic);
    console.log(`Setting up subscription: ${this.subscription}`);
    await this.googlePubSub.createSubscription(this.topic, this.subscription);
  }

  onModuleDestroy() {
    console.log('GooglePubSub Module destroying!');
    this.events.removeAllListeners();
  }

  // Publisher
  publish<T extends IEvent>(event: T) {
    const message = Buffer.from(JSON.stringify(event));

    this.googlePubSub
      .topic(this.topic)
      .publisher(this.publisherOptions)
      .publish(message)
      .then((messageId) => {
        console.log(`Published message: ${messageId}`);
      })
      .catch((err) => {
        console.error('Error publishing message!', err);
      });
  }

  bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    // Subscriber
    this.events = this.googlePubSub
      .topic(this.topic)
      .subscription(this.subscription, this.subscriberOptions);

    fromEvent<GooglePubSubMessage>(this.events, 'message')
    .subscribe((message) => {
      console.log(`Recived message: ${message.id}`);
      const event = JSON.parse(message.data);
      subject.next(event);
      message.ack();
    });

    fromEvent(this.events, 'error')
    .subscribe(error => console.error('Recived error message', error));
  }
}
