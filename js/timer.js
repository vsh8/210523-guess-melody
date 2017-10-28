export const createTimer = (counter) => {
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
