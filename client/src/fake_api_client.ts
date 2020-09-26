// A fake implementation of api_client with test data to avoid making an RPC during development.

import { FilteringState } from './store/filtering/types';
import { Bit, Comment } from './types';

const bits: { [key: string]: any }[] = [
  {
    postId: 'L3WDO8EL3LEKS',
    author: {
      personId: 'I2L3KFAE9GLREJ3',
      name: 'Shears',
    },
    dateCreated: new Date(2017, 5, 1, 12, 12).getTime(),
    upvotes: 10,
    downvotes: 3,
    title: 'Fox is unedgeguardable',
    content: "No matter what you do, you'll never be able to kill a recovering Fox.",
    mainChars: ['fo'],
    standaloneTags: ['ed'],
  },
  {
    postId: 'ME8DU23MNO0S',
    author: {
      personId: '562B3409SLL',
      name: 'JonnJonn',
    },
    dateCreated: new Date(1993, 6, 24).getTime(),
    upvotes: 42,
    downvotes: 8,
    title: "Master Hand's getup attack",
    content: "It's a 1HKO.",
    stages: ['dl', 'cj'],
    standaloneTags: ['ap'],
  },
  {
    postId: 'JNHQ98ASKJAK',
    author: {
      personId: '82JS0NG28XL1',
      name: 'LowwwPower',
    },
    dateCreated: new Date(2010, 8, 12, 6, 17, 53).getTime(),
    upvotes: 53,
    downvotes: 21,
    title: 'Falcon shield pressure against Yoshi',
    content:
      "A way to pressure Yoshis that love baiting platform push off by holding shield, especially when you are respawning and have invincibility. Even if you don't get the break, they often times get hit trying to escape which can lead to a bunch of combo starters.",
    mainChars: ['ca'],
    vsChars: ['yo'],
  },
];
const bitsJson: string = JSON.stringify(bits);

const comments: Comment[] = [
  new Comment({
    id: 'J78S348M293',
    postId: 'L3WDO8EL3LEKS',
    author: {
      personId: 'JAS724IR8933',
      name: 'LD',
    },
    dateCreated: new Date(2018, 1, 14, 10, 11, 16).getTime(),
    content: 'Not true.',
  }),
  new Comment({
    id: 'B72902B3846',
    postId: 'L3WDO8EL3LEKS',
    author: {
      personId: 'L187S60DD3',
      name: 'n00bl33t',
    },
    dateCreated: new Date(2018, 1, 17, 6, 13, 28).getTime(),
    content: 'Pshh what do you know',
  }),
  new Comment({
    id: 'I26739X7034',
    postId: 'ME8DU23MNO0S',
    author: {
      personId: 'R67218386X',
      name: 'Cobr',
    },
    dateCreated: new Date(2000, 11, 10, 5, 11, 45).getTime(),
    content: 'This is the kind of investigative reporting we need right now.',
  }),
];

export const fakeApiClient = {
  fetchBits(filters: FilteringState) {
    const filtered = bits.filter((bit) => {
      if (filters.mainCharacters.size > 0) {
        if (!bit.mainChars) return false;
        for (let char of Array.from(filters.mainCharacters)) {
          if (!bit.mainChars || bit.mainChars.indexOf(char.id) == -1) return false;
        }
      }

      if (filters.labels.size > 0) {
        if (!bit.standaloneTags) return false;
        for (let label of Array.from(filters.labels)) {
          if (!bit.standaloneTags || bit.standaloneTags.indexOf(label.id) == -1) return false;
        }
      }

      if (filters.vsCharacters.size > 0) {
        if (!bit.vsChars) return false;
        for (let char of Array.from(filters.vsCharacters)) {
          if (!bit.vsChars || bit.vsChars.indexOf(char.id) == -1) return false;
        }
      }

      if (filters.stages.size > 0) {
        if (!bit.stages) return false;
        for (let stage of Array.from(filters.stages)) {
          if (bit.stages.indexOf(stage.id) == -1) return false;
        }
      }
      return true;
    });
    const bitsJson = JSON.stringify({
      bits: filtered.sort((a, b) => {
        switch (filters.sort) {
          case 'score':
            return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
          case 'newest':
            return b.dateCreated - a.dateCreated;
          case 'oldest':
            return -1 * (b.dateCreated - a.dateCreated);
          default:
            return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
        }
      }),
    });
    return Promise.resolve(new Response(bitsJson));
  },

  fetchBit(bitId: string) {
    return Promise.resolve({ bit: bits.find((bit) => bit.postId === bitId) });
  },

  fetchComments(bitId: string) {
    return Promise.resolve(comments.filter((comment) => comment.postId === bitId));
  },

  async createBit(bit: Bit) {
    bits.push({
      ...bit,
      dateCreated: new Date().getTime(),
    });
    await new Promise((r) => setTimeout(r, 2000));
    return Promise.resolve(`/bits${bits.slice(-1)[0]}`);
    // TODO: Return a 201 response
  },

  fetchProfile() {
    return Promise.resolve({ user: { twitterProfile: { displayName: 'LD_on_1_frame' } } });
  },
};
