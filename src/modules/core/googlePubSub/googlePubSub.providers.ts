import {
    GOOGLE_PUB_SUB_PROVIDER,
    GOOGLE_PUB_SUB_CONFIG,
    GOOGLE_PUB_SUB_CONFIG_USE_ENV,
} from './googlePubSub.constants';
import * as PubSub from '@google-cloud/pubsub';

export const googlePubSubProviders = [
  {
    provide: GOOGLE_PUB_SUB_PROVIDER,
    useFactory: (
        googlePubSubConfig?: PubSub.GCloudConfiguration,
    ) : PubSub.PubSub => {
        if (googlePubSubConfig === GOOGLE_PUB_SUB_CONFIG_USE_ENV) {
            return PubSub();
        }
        return PubSub(googlePubSubConfig);
    },
    inject: [GOOGLE_PUB_SUB_CONFIG],
  },
];
