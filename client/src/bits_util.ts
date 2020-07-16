import { Bit, CHARACTER_MAP, LABEL_MAP, STAGE_MAP, CharacterId, StageId, LabelId } from './types';

export const decorateBit = (bit:{ [key: string]: any}): Bit => new Bit({
    ...bit,
    mainChars: bit.mainChars && bit.mainChars.map((char: CharacterId) => CHARACTER_MAP.get(char)).filter(Boolean),
    vsChars: bit.vsChars && bit.vsChars.map((char: CharacterId) => CHARACTER_MAP.get(char)).filter(Boolean),
    stages: bit.stages && bit.stages.map((stage: StageId) => STAGE_MAP.get(stage)).filter(Boolean),
    standaloneTags: bit.standaloneTags && bit.standaloneTags.map((tag: LabelId) => LABEL_MAP.get(tag)).filter(Boolean),
})