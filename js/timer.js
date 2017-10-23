export const createTimer = (counter) => {
  return {
    counter,
    tick() {
      if (this.counter > 0) {
        return this.counter--;
      } else {
        return `time is over`;
      }
    }
  };
};
