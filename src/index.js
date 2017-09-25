import collectDeviceMetadata from './device';

const CRYPTID_ENDPOINT = 'https://cryptid.adorable.io/api/events';

function post (event, options) {
  let url = options.url || CRYPTID_ENDPOINT;
  let requestOptions = options.request || {};
  let {beforeFetch, afterFetch} = options;

  let mergedOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
    ...requestOptions
  };

  if (beforeFetch) beforeFetch(url, mergedOptions);

  return fetch(url, mergedOptions)
    .catch(err => console.error(err))
    .then((response) => {
      if (afterFetch) afterFetch(response);
    });
}

function generatePayload(trackerId, event) {
  return {
    event: {
      trackerId: trackerId,
      ...collectDeviceMetadata(),
      ...event,
    }
  };
}

export default class Tracker {
  constructor (trackerId, options = {}) {
    this.trackerId = trackerId;
    this.options = options;
    this.post = post;
  }

  send (event) {
    return this.post(generatePayload(this.trackerId, event), this.options);
  }
}
