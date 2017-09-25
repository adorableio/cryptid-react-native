import collectDeviceMetadata from './device';

const CRYPTID_ENDPOINT = 'https://cryptid.adorable.io/api/events';

function post (event, options) {
  let url = options.url || CRYPTID_ENDPOINT;
  let mergedOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
    ...options
  };
  return fetch(url, mergedOptions);
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
    this.post(generatePayload(this.trackerId, event), this.options);
  }
}
