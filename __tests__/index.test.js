jest.mock('../src/device');

import Tracker from '../src';

describe('Tracker', () => {
  it('can be instantiated with a trackerId and options', () => {
    let tracker = new Tracker('abc123', {hello: 'world'});
    expect(tracker.trackerId).toEqual('abc123');
    expect(tracker.options).toMatchObject({hello: 'world'});
  });

  describe('#send', () => {
    let tracker;
    const trackerId = 'abc123';
    const defaultOptions = {};

    beforeEach(() => {
      tracker = new Tracker(trackerId, defaultOptions);
      tracker.post = jest.fn();
    });

    it('includes the trackerId in the payload', () => {
      tracker.send({hello: 'there'});
      expect(tracker.post).toHaveBeenCalledWith({
        event: expect.objectContaining({trackerId: 'abc123'})
      }, expect.anything());
    });

    it('includes metadata', () => {
      tracker.send({hello: 'there'});
      expect(tracker.post).toHaveBeenCalledWith({
        event: expect.objectContaining({deviceManufacturer: 'iPhone 8'})
      }, expect.anything());
    });

    it('merges metadata', () => {
      tracker.send({deviceManufacturer: 'Nexus 5'});
      expect(tracker.post).toHaveBeenCalledWith({
        event: expect.objectContaining({deviceManufacturer: 'Nexus 5'})
      }, expect.anything());
    });

    it('packages event data', () => {
      tracker.send({event_value: 'button-clicked'});
      expect(tracker.post).toHaveBeenCalledWith({
        event: expect.objectContaining({event_value: 'button-clicked'})
      }, expect.anything());
    });
  });
});
