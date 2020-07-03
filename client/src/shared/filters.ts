import * as query from './query_params';

export const FILTER_TAG_APPROACH = 'Approach';
export const FILTER_TAG_EDGEGUARDING = 'Edgeguarding';
export const FILTER_TAG_COMBOS = 'Combos';
export const FILTER_TAG_ESCAPES = 'Escapes';


export const PARAMS_TO_DISPLAY_TAGS: { [key: string]: string } = {
  [query.FILTER_PARAM_APPROACH]: FILTER_TAG_APPROACH,
  [query.FILTER_PARAM_EDGEGUARDING]: FILTER_TAG_EDGEGUARDING,
  [query.FILTER_PARAM_COMBOS]: FILTER_TAG_COMBOS,
  [query.FILTER_PARAM_ESCAPES]: FILTER_TAG_ESCAPES,
};

export const DISPLAY_TO_PARAMS_TAGS: { [key: string]: string } = {
  [FILTER_TAG_APPROACH]: query.FILTER_PARAM_APPROACH,
  [FILTER_TAG_EDGEGUARDING]: query.FILTER_PARAM_EDGEGUARDING,
  [FILTER_TAG_COMBOS]: query.FILTER_PARAM_COMBOS,
  [FILTER_TAG_ESCAPES]: query.FILTER_PARAM_ESCAPES,
};
