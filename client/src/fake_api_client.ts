// A fake implementation of api_client with test data to avoid making an RPC during development.

import * as uuid from 'uuid';
import { Bit, Comment, CharacterId, LabelId, StageId } from './types';
import { FilteringState, SortOption } from './store/filtering/types';

const bits = [new Bit({
  postId: 'L3WDO8EL3LEKS',
  author: {
    personId: 'I2L3KFAE9GLREJ3',
    name: 'Shears',
  },
  dateCreated: new Date(2017, 5, 1, 12, 12).getTime(),
  upvotes: 10,
  downvotes: 3,
  title: 'Fox is unedgeguardable',
  content: 'No matter what you do, you\'ll never be able to kill a recovering Fox.',
  mainChars: ['Fox'],
  standaloneTags: ['Edgeguarding'],
}), new Bit({
  postId: 'ME8DU23MNO0S',
  author: {
    personId: '562B3409SLL',
    name: 'JonnJonn',
  },
  dateCreated: new Date(1993, 6, 24).getTime(),
  upvotes: 42,
  downvotes: 8,
  title: 'Master Hand\'s getup attack',
  content: 'It\'s a 1HKO.',
  stages: ['Dream Land', 'Congo Jungle'],
  standaloneTags: ['Approach'],
}), new Bit({
  postId: 'JNHQ98ASKJAK',
  author: {
    personId: '82JS0NG28XL1',
    name: 'LowwwPower',
  },
  dateCreated: new Date(2010, 8, 12, 6, 17, 53).getTime(),
  upvotes: 53,
  downvotes: 21,
  title: 'Falcon shield pressure against Yoshi',
  content: 'A way to pressure Yoshis that love baiting platform push off by holding shield, especially when you are respawning and have invincibility. Even if you don\'t get the break, they often times get hit trying to escape which can lead to a bunch of combo starters.',
  mainChars: ['Captain Falcon'],
  vsChars: ['Yoshi'],
})];

const comments: Comment[] = [{
  id: 'J78S348M293',
  postId: 'L3WDO8EL3LEKS',
  author: {
    personId: 'JAS724IR8933',
    name: 'LD',
  },
  dateCreated: new Date(2018, 1, 14, 10, 11, 16).getTime(),
  content: 'Not true.',
}, {
  id: 'B72902B3846',
  postId: 'L3WDO8EL3LEKS',
  author: {
    personId: 'L187S60DD3',
    name: 'n00bl33t',
  },
  dateCreated: new Date(2018, 1, 17, 6, 13, 28).getTime(),
  content: 'Pshh what do you know',
}, {
  id: 'I26739X7034',
  postId: 'ME8DU23MNO0S',
  author: {
    personId: 'R67218386X',
    name: 'Cobr',
  },
  dateCreated: new Date(2000, 11, 10, 5, 11, 45).getTime(),
  content: 'This is the kind of investigative reporting we need right now.',
}];

export function fetchBits(filters: FilteringState) {
  console.log('Fetching new bits!', filters)
  const filtered = bits.filter(bit => {
    if (filters.mainCharacters.size > 0) {
      for(let char of Array.from(filters.mainCharacters)) {
        if (bit.mainChars.indexOf(char as CharacterId) == -1) return false;
      }
    }

    if (filters.labels.size > 0) {
      for(let label of Array.from(filters.labels)) {
        if (bit.standaloneTags.indexOf(label as LabelId) == -1) return false;
      }
    }

    if (filters.vsCharacters.size > 0) {
      for(let char of Array.from(filters.vsCharacters)) {
        if (bit.vsChars.indexOf(char as CharacterId) == -1) return false;
      }
    }

    if (filters.stages.size > 0) {
      for(let stage of Array.from(filters.stages)) {
        if (bit.stages.indexOf(stage as StageId) == -1) return false;
      }
    }
    return true;
  })
  return Promise.resolve({
    bits: filtered.sort((a, b) => {
      switch (filters.sort) {
        case SortOption.SCORE:
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case SortOption.NEWEST:
          return b.dateCreated - a.dateCreated;
        case SortOption.OLDEST:
          return -1 * (b.dateCreated - a.dateCreated);
        default:
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      }
    }),
  });
}

export function fetchBit(bitId: string) {
  console.log('Fetching new bit!')
  return Promise.resolve({ bit: bits.find(bit => bit.postId === bitId) });
}

export function fetchComments(bitId: string) {
  return Promise.resolve(comments.filter(comment => comment.postId === bitId));
}

export function createBit(bit: Bit) {
  bits.push({
    ...bit,
    postId: uuid.v1(),
    dateCreated: new Date().getTime(),
  });
  return Promise.resolve(`/bits${bits.slice(-1)[0]}`);
  // TODO: Return a 201 response
}

export function fetchProfile() {
  return Promise.resolve({ user: { twitterProfile: { displayName: 'LD_on_1_frame' } } });
}
