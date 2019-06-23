/**
 * All post types
 */
export enum POST_TYPES {
  TEXT = 'TEXT',
  LOCATION = 'LOCATION',
  KILLMAIL = 'KILLMAIL',
  // 'corporationChange'
  // 'allianceChange'
}

/**
 * Types that can be created
 * TODO: Should inherit values from POST_TYPES and remove those that can't be created (KILLMAIL)
 */
export enum POST_CREATABLE_TYPES {
  TEXT = 'TEXT',
  LOCATION = 'LOCATION',
}

export const getPostListKeyForCharacterWall = (characterId: string|number) => `character:${characterId}`;
export const getPostListKeyForCorporationWall = (corporationId: string|number) => `corporation:${corporationId}`;
export const getPostListKeyForAllianceWall = (allianceId: string|number) => `alliance:${allianceId}`;
export const getPostListKeyForHashtagWall = (hashtag: string) => `hashtag:${hashtag}`;
export const getPostListKeyForLatestWall = () => `latest`;
