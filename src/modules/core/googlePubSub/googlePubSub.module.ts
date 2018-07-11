import { Global, Module, DynamicModule } from '@nestjs/common';
import { googlePubSubProviders } from './googlePubSub.providers';
import * as PubSub from '@google-cloud/pubsub';
import {
  GOOGLE_PUB_SUB_CONFIG,
  GOOGLE_PUB_SUB_TOPIC,
  GOOGLE_PUB_SUB_PUBLISHER_OPTIONS,
  GOOGLE_PUB_SUB_SUBSCRIBER_OPTIONS,
  GOOGLE_PUB_SUB_SUBSCRIPTION,
  GOOGLE_PUB_SUB_CONFIG_USE_ENV,
} from './googlePubSub.constants';
import { GooglePubSub } from './googlePubSub';

@Global()
@Module({
  providers: [
    ...googlePubSubProviders,
    {
      provide: GOOGLE_PUB_SUB_CONFIG,
      useValue: GOOGLE_PUB_SUB_CONFIG_USE_ENV,
    },
  ],
  exports: [
    ...googlePubSubProviders,
    {
      provide: GOOGLE_PUB_SUB_CONFIG,
      useValue: GOOGLE_PUB_SUB_CONFIG_USE_ENV,
    },
  ],
})
export class GooglePubSubModule {
  static forRoot(
    config?: PubSub.GCloudConfiguration,
  ): DynamicModule {
    return {
      module: GooglePubSubModule,
      providers: [
        {
          provide: GOOGLE_PUB_SUB_CONFIG,
          useValue: config,
        },
      ],
      exports: [
        {
          provide: GOOGLE_PUB_SUB_CONFIG,
          useValue: config,
        },
      ],
    };
  }

  static forFeature(
    topic: string,
    subscription: string,
    publisherSubscriberConfig: {
      publisherOptions?: PubSub.Topic.PublisherOptions,
      subscriptionOptions?: PubSub.Topic.SubscriptionOptions,
    } = {},
  ): DynamicModule {
    if (!publisherSubscriberConfig.publisherOptions) {
      publisherSubscriberConfig.publisherOptions = {};
    }
    if (!publisherSubscriberConfig.subscriptionOptions) {
      publisherSubscriberConfig.subscriptionOptions = {};
    }
    return {
      module: GooglePubSubModule,
      providers: [
        {
          provide: GOOGLE_PUB_SUB_TOPIC,
          useValue: topic,
        },
        {
          provide: GOOGLE_PUB_SUB_SUBSCRIPTION,
          useValue: subscription,
        },
        {
          provide: GOOGLE_PUB_SUB_PUBLISHER_OPTIONS,
          useValue: publisherSubscriberConfig.publisherOptions,
        },
        {
          provide: GOOGLE_PUB_SUB_SUBSCRIBER_OPTIONS,
          useValue: publisherSubscriberConfig.subscriptionOptions,
        },
        GooglePubSub,
      ],
      exports: [
        GooglePubSub,
      ],
    };
  }
}
