import uuid from 'uuid';
import AWS from 'aws-sdk';
import dynamodb from 'serverless-dynamodb-client';
import jsStringEscape from 'js-string-escape';

// TODO(thenuge): Replace this test data with real data from the DB.
const foxBit = {
    id: 'L3WDO8EL3LEKS',
    author: {
      person_id: 'I2L3KFAE9GLREJ3',
      name: 'Shears',
    },
    date_created: new Date(2017, 5, 1, 12, 12).getTime(),
    upvotes: 10,
    downvotes: 3,
    title: 'Fox is unedgeguardable',
    content: 'No matter what you do, you\'ll never be able to kill a recovering Fox.',
    mainChars: ['Fox'],
    standaloneTags: ['Edgeguarding'],
};
const handBit = {
    id: 'ME8DU23MNO0S',
    author: {
      person_id: '562B3409SLL',
      name: 'JonnJonn',
    },
    date_created: new Date(1993, 6, 24).getTime(),
    upvotes: 42,
    downvotes: 8,
    title: 'Master Hand\'s getup attack',
    content: 'It\'s a 1HKO.',
    stages: ['Dream Land', 'Congo Jungle'],
    standaloneTags: ['Approach'],
};
const falconPressureBit = {
    id: 'JNHQ98ASKJAK',
    author: {
      person_id: '82JS0NG28XL1',
      name: 'LowwwPower',
    },
    date_created: new Date(2010, 8, 12, 6, 17, 53).getTime(),
    upvotes: 53,
    downvotes: 21,
    title: 'Falcon shield pressure against Yoshi',
    content: 'A way to pressure Yoshis that love baiting platform push off by holding shield, especially when you are respawning and have invincibility. Even if you don\'t get the break, they often times get hit trying to escape which can lead to a bunch of combo starters.',
    mainChars: ['Captain Falcon'],
    vsChars: ['Yoshi'],
};
const bits = {bits: [foxBit, handBit, falconPressureBit]};

const foxComment1 = {
  id: 'J78S348M293',
  bit_id: 'L3WDO8EL3LEKS',
  author: {
    person_id: 'JAS724IR8933',
    name: 'LD'
  },
  date_created: new Date(2018, 1, 14, 10, 11, 16).getTime(),
  content: 'Not true.'
};
const foxComment2 = {
  id: 'B72902B3846',
  bit_id: 'L3WDO8EL3LEKS',
  author: {
    person_id: 'L187S60DD3',
    name: 'n00bl33t'
  },
  date_created: new Date(2018, 1, 17, 6, 13, 28).getTime(),
  content: 'Pshh what do you know'
};
const handComment = {
  id: 'I26739X7034',
  bit_id: 'ME8DU23MNO0S',
  author: {
    person_id: 'R67218386X',
    name: 'Cobr'
  },
  date_created: new Date(2000, 11, 10, 5, 11, 45).getTime(),
  content: 'This is the kind of investigative reporting we need right now.'
};
const comments = [foxComment1, foxComment2, handComment];

AWS.config.update({ region: 'us-east-2' });
const dynamoDb = dynamodb.doc;

export function getBits() {
  return bits;
}

export function createBit(bit) {
  const params = {
    TableName: 'posts',
    Item: {
      postId: uuid.v1(),
      author: {
        name: jsStringEscape(bit.author.name),
        personId: jsStringEscape(bit.author.person_id)
      },
      dateCreated: new Date().getTime(),
      upvotes: 0,
      downvotes: 0,
      title: jsStringEscape(bit.title),
      content: jsStringEscape(bit.content),
      ...(bit.tags ? { tags: jsStringEscape(bit.tags.join()) } : {}),
      ...(bit.stages ? { stages: jsStringEscape(bit.stages.join()) } : {}),
      ...(bit.mainChars ? { main_chars: jsStringEscape(bit.main_chars.join()) } : {}),
      ...(bit.vsChars ? { vs_chars: jsStringEscape(bit.vsCharss.join()) } : {})
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDb.put(params).promise()
        .then(data => resolve(params.Item))
        .catch(err => reject(err));
  });
}

export function getComments(reqParams) {
  return comments.filter(comment => comment.bit_id === reqParams.bitId);
}