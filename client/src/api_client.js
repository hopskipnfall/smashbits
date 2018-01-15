export function getBits() {
  let uri = 'http://localhost:3001/bits';
  if (process.env.NODE_ENV === 'production') {
    uri = 'https://7mgkyv8jyg.execute-api.us-east-1.amazonaws.com/dev';
  }
  return fetch(uri)
      .then(result => result.json())
      .then(response => response.bits.map(bit => fromJS(bit)));
}