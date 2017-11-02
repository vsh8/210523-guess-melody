import assert from 'assert';

import createTimer, {timeMinutes, timeSeconds, getVisualTimerCircleLength} from './timer';


describe(`timeMinutes`, () => {
  it(`should return right number of minutes by time`, () => {
    assert.equal(timeMinutes(0), `00`);
    assert.equal(timeMinutes(59), `00`);
    assert.equal(timeMinutes(60), `01`);
    assert.equal(timeMinutes(119), `01`);
    assert.equal(timeMinutes(120), `02`);
  });
});

describe(`timeSeconds`, () => {
  it(`should return right number of seconds by time`, () => {
    assert.equal(timeSeconds(0), `00`);
    assert.equal(timeSeconds(1), `01`);
    assert.equal(timeSeconds(9), `09`);
    assert.equal(timeSeconds(10), `10`);
    assert.equal(timeSeconds(59), `59`);
    assert.equal(timeSeconds(60), `00`);
    assert.equal(timeSeconds(61), `01`);
    assert.equal(timeSeconds(69), `09`);
    assert.equal(timeSeconds(70), `10`);
    assert.equal(timeSeconds(119), `59`);
    assert.equal(timeSeconds(120), `00`);
  });
});


describe(`getVisualTimerCircleLength`, () => {
  it(`should return 0 in an initial state`, () => {
    assert.equal(0, getVisualTimerCircleLength(100, 300, 300));
  });
  it(`should return the half length on a half`, () => {
    assert.equal(314, getVisualTimerCircleLength(100, 300, 150));
  });
  it(`should return the full length in the final state`, () => {
    assert.equal(628, getVisualTimerCircleLength(100, 300, 0));
  });
});


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
