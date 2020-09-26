import { Bit, CharacterId, CHARACTER_MAP, LabelId, LABEL_MAP, StageId, STAGE_MAP } from './types';

export const decorateBit = (bit: { [key: string]: any }): Bit =>
  new Bit({
    ...bit,
    mainChars: bit.mainChars && bit.mainChars.map((char: CharacterId) => CHARACTER_MAP.get(char)).filter(Boolean),
    vsChars: bit.vsChars && bit.vsChars.map((char: CharacterId) => CHARACTER_MAP.get(char)).filter(Boolean),
    stages: bit.stages && bit.stages.map((stage: StageId) => STAGE_MAP.get(stage)).filter(Boolean),
    standaloneTags: bit.standaloneTags && bit.standaloneTags.map((tag: LabelId) => LABEL_MAP.get(tag)).filter(Boolean),
  });

export const transformBitForRequest = (bit: Bit): { [key: string]: any } => ({
  ...bit,
  media:
    bit.media &&
    bit.media.map((singleMedia) => ({
      ...singleMedia,
      uri: singleMedia.uri.href(),
    })),
});
