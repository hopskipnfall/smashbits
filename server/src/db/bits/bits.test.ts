import { BitsModel, BitDocument } from './bits.schema';
import { setVote } from './bits.methods';

describe('BitsModel', () => {
  it('should increment upvotes when setVote is called with 1', async () => {
    const bit = await BitsModel.create({
      postId: 'test-bit-1',
      dateCreated: new Date().getTime(),
      author: {
        name: 'test author',
        personId: 'test-author-id',
      },
      upvotes: 0,
      downvotes: 0,
      title: 'test title',
      content: 'test content',
      media: [],
      mainChars: [],
      vsChars: [],
      stages: [],
      tags: [],
    });
    await bit.setVote(1);
    expect(bit.upvotes).toEqual(1);
  });

  it('should increment downvotes when setVote is called with -1', async () => {
    const bit = await BitsModel.create({
      postId: 'test-bit-2',
      dateCreated: new Date().getTime(),
      author: {
        name: 'test author',
        personId: 'test-author-id',
      },
      upvotes: 0,
      downvotes: 0,
      title: 'test title',
      content: 'test content',
      media: [],
      mainChars: [],
      vsChars: [],
      stages: [],
      tags: [],
    });
    await bit.setVote(-1);
    expect(bit.downvotes).toEqual(1);
  });

    it('should increment upvotes and decrement downvotes correctly', async () => {
    const bit = await BitsModel.create({
      postId: 'test-bit-3',
      dateCreated: new Date().getTime(),
      author: {
        name: 'test author',
        personId: 'test-author-id',
      },
      upvotes: 0,
      downvotes: 0,
      title: 'test title',
      content: 'test content',
      media: [],
      mainChars: [],
      vsChars: [],
      stages: [],
      tags: [],
    });
    await bit.setVote(1);
    expect(bit.upvotes).toEqual(1);
    await bit.setVote(-1);
    expect(bit.downvotes).toEqual(1);
    await bit.setVote(0);
    expect(bit.upvotes).toEqual(1);
    expect(bit.downvotes).toEqual(1);
  });
});
