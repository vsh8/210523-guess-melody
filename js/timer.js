export const timeMinutes = (time) => {
  return `0` + Math.floor(time / 60);
};

export const timeSeconds = (time) => {
  const seconds = time % 60;
  if (seconds >= 10) {
    return `` + seconds;
  } else {
    return `0` + seconds;
  }
};


export const getVisualTimerCircleLength = (visualTimerRadius, timeLimit, gameTime) => {
  return Math.floor(2 * Math.PI * visualTimerRadius * (1 - gameTime / timeLimit));
};


export default (counter) => {
  return {
    counter,
    tick() {
      if (this.counter > 0) {
        return this.counter-- > 0;
      } else {
        return false;
      }
    }
  };
};
