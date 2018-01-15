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

export default function getBits() {
  return bits;
}