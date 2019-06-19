import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authenticationReducer } from './services/authentication/authentication.reducer';
import { searchReducer } from './services/search/search.reducer';
import { characterReducer } from './services/character/character.reducer';
import { postReducer } from './services/post/post.reducer';
import { corporationReducer } from './services/corporation/corporation.reducer';
import { allianceReducer } from './services/alliance/alliance.reducer';
import { commentReducer } from './services/comment/comment.reducer';
import { IAuthenticationState } from './services/authentication/authentication.interface';
import { ICommentState } from './services/comment/comment.interface';
import { IPostState } from './services/post/post.interface';
import { ICorporationState } from './services/corporation/corporation.interface';
import { ISearchState } from './services/search/search.interface';
import { ICharacterState } from './services/character/character.interface';
import { IAllianceState } from './services/alliance/alliance.interface';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { IWebsocketState } from './services/websocket/websocket.interface';
import { websocketReducer } from './services/websocket/websocket.reducer';
import { AllianceEffects } from './services/alliance/alliance.effects';
import { CorporationEffects } from './services/corporation/corporation.effects';
import { CharacterEffects } from './services/character/character.effects';
import { CommentEffects } from './services/comment/comment.effects';
import { SearchEffects } from './services/search/search.effects';
import { AuthenticationEffects } from './services/authentication/authentication.effects';
import { PostEffects } from './services/post/post.effects';
import { WebsocketEffects } from './services/websocket/websocket.effects';
import { NotificationEffects } from './services/notification/notification.effects';
import { notificationReducer } from './services/notification/notification.reducer';
import { INotificationState } from './services/notification/notification.interface';
import { IApiState } from './services/api.interface';
import { apiReducer } from './services/api.reducer';
import { ApiEffects } from './services/api.effects';
import {FollowEffects} from './services/follow/follow.effects';

export interface IAppState {
  authentication?: IAuthenticationState,
  search?: ISearchState,
  character?: ICharacterState,
  corporation?: ICorporationState,
  alliance?: IAllianceState,
  comment?: ICommentState,
  post?: IPostState,
  router?: RouterReducerState,
  websocket?: IWebsocketState,
  notification?: INotificationState,
  api?: IApiState,
}

export function localStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    // Only store authentication
    keys: ['authentication'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
   localStorage,
];

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const reducers: ActionReducerMap<IAppState> = {
  authentication: authenticationReducer,
  router: routerReducer,
  search: searchReducer,
  character: characterReducer,
  corporation: corporationReducer,
  alliance: allianceReducer,
  post: postReducer,
  comment: commentReducer,
  websocket: websocketReducer,
  notification: notificationReducer,
  api: apiReducer,
};

export const effects = [
  AllianceEffects,
  AuthenticationEffects,
  CharacterEffects,
  CommentEffects,
  CorporationEffects,
  PostEffects,
  SearchEffects,
  WebsocketEffects,
  NotificationEffects,
  ApiEffects,
  FollowEffects,
];
