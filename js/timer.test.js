import assert from 'assert';

import createTimer from './timer';


describe(`Timer`, () => {
  for (let i = 0; i < 10; i++) {
    it(`should tick ${i} times for the argument equals to ${i}`, () => {
      let t = createTimer(i);
      for (let j = i; j > 0; j--) {
        assert.equal(true, t.tick());
      }
      assert.equal(false, t.tick());
    });
  }
});
