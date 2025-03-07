/**
 * Instance methods on bit documents.
 * @packageDocumentation
 */

import { BitDocument } from './bits.schema';

export async function setVote(
  this: BitDocument,
  vote: -1 | 0 | 1,
): Promise<BitDocument> {
    if (vote === 1) {
        this.upvotes +=1;
    }
    if(vote === -1){
        this.downvotes +=1;
    }
    return this.save();
}
