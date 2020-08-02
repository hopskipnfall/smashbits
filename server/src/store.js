import uuid from 'uuid';
import User from './User';

export function queryUser({
  id,
  twitterId,
} = {}) {
  if (id) {
    return User.findOne({ id }).exec();
  }
  if (twitterId) {
    return User.findOne({ 'twitterProfile.id': twitterId }).exec();
  }
}

export function putTwitterUser(profile) {
  const params = {
    id: uuid.v1(),
    twitterProfile: profile,
  };

  return new Promise((resolve, reject) => {
    User.create(params)
      .then(data => resolve(params))
      .catch(err => reject(err));
  });
}
