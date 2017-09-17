/**
 * All post types
 */
export const TYPES = {
  TEXT: 'TEXT',
  LOCATION: 'LOCATION',
  KILLMAIL: 'KILLMAIL',
  // 'corporationChange'
  // 'allianceChange'
};

/**
 * Types that can be created
 * TODO: Should inherit values from TYPES and remove those that can't be created (KILLMAIL)
 */
export const CREATABLE_TYPES = {
  TEXT: 'TEXT',
  LOCATION: 'LOCATION',
};

export const POST_REPOSITORY_TOKEN = 'POST_REPOSITORY_TOKEN';

