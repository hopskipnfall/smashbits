import { model } from "mongoose";
import { BitDocument } from "./bits.types";
import {BitsSchema} from './bits.schema';

export const BitsModel = model<BitDocument>('Post', BitsSchema);
