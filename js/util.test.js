import assert from 'assert';

import {timeMinutes, timeSeconds} from './util';


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
