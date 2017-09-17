/**
 * All post types
 * @type {{TEXT: string; LOCATION: string; KILLMAIL: string}}
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
 * @type {{TEXT: string; LOCATION: string}}
 */
export const CREATABLE_TYPES = {
  TEXT: 'TEXT',
  LOCATION: 'LOCATION',
};
