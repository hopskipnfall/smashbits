export const QUERY_SORT = 'sort';
export const QUERY_OFFSET = 'offset';
export const QUERY_LIMIT = 'limit';
export const QUERY_MAIN_CHARS = 'chars';
export const QUERY_VS_CHARS = 'vs';
export const QUERY_STAGES = 'stages';
export const QUERY_TAGS = 'tags';

export const SORT_PARAM_DATE = 'date';
export const SORT_PARAM_SCORE = 'score';

export const FILTER_PARAM_LUIGI = 'lu';
export const FILTER_PARAM_MARIO = 'ma';
export const FILTER_PARAM_DK = 'do';
export const FILTER_PARAM_LINK = 'li';
export const FILTER_PARAM_SAMUS = 'sa';
export const FILTER_PARAM_FALCON = 'ca';
export const FILTER_PARAM_NESS = 'ne';
export const FILTER_PARAM_YOSHI = 'yo';
export const FILTER_PARAM_KIRBY = 'ki';
export const FILTER_PARAM_FOX = 'fo';
export const FILTER_PARAM_PIKA = 'pi';
export const FILTER_PARAM_JIGGLY = 'pu';

export const FILTER_PARAM_PEACH = 'pc';
export const FILTER_PARAM_CONGO = 'cj';
export const FILTER_PARAM_HYRULE = 'hc';
export const FILTER_PARAM_ZEBES = 'pz';
export const FILTER_PARAM_MUSHROOM = 'mk';
export const FILTER_PARAM_DREAMLAND = 'dl';
export const FILTER_PARAM_SECTOR_Z = 'sz';
export const FILTER_PARAM_SAFFRON = 'sc';
export const FILTER_PARAM_META_CRYSTAL = 'mc';
export const FILTER_PARAM_YOSHI_ISLAND_19XX = 'yi';
export const FILTER_PARAM_FINAL_DESTINATION = 'fd';
export const FILTER_PARAM_BATTLEFIELD = 'bf';

export const FILTER_PARAM_APPROACH = 'ap';
export const FILTER_PARAM_EDGEGUARDING = 'ed';
export const FILTER_PARAM_COMBOS = 'co';
export const FILTER_PARAM_ESCAPES = 'es';

export const CHAR_FILTERS = new Set([
  FILTER_PARAM_LUIGI,
  FILTER_PARAM_MARIO,
  FILTER_PARAM_DK,
  FILTER_PARAM_LINK,
  FILTER_PARAM_SAMUS,
  FILTER_PARAM_FALCON,
  FILTER_PARAM_NESS,
  FILTER_PARAM_YOSHI,
  FILTER_PARAM_KIRBY,
  FILTER_PARAM_FOX,
  FILTER_PARAM_PIKA,
  FILTER_PARAM_JIGGLY,
]);

export const STAGE_FILTERS = new Set([
  FILTER_PARAM_PEACH,
  FILTER_PARAM_CONGO,
  FILTER_PARAM_HYRULE,
  FILTER_PARAM_ZEBES,
  FILTER_PARAM_MUSHROOM,
  FILTER_PARAM_DREAMLAND,
  FILTER_PARAM_SECTOR_Z,
  FILTER_PARAM_SAFFRON,
  FILTER_PARAM_META_CRYSTAL,
  FILTER_PARAM_YOSHI_ISLAND_19XX,
  FILTER_PARAM_FINAL_DESTINATION,
  FILTER_PARAM_BATTLEFIELD,
]);

export const TAG_FILTERS = new Set([
  FILTER_PARAM_APPROACH,
  FILTER_PARAM_EDGEGUARDING,
  FILTER_PARAM_COMBOS,
  FILTER_PARAM_ESCAPES,
]);
