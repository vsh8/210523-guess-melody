export const inflectSingularNominativeNeuterNumber = (num) => {
  if (num % 10 !== 3 || num % 100 === 13) {
    return `${num}-ое`;
  } else {
    return `${num}-ье`;
  }
};

export const inflectPluralGenitivePlayer = (num) => {
  if (num % 10 === 1 && num % 100 !== 11) {
    return `игрока`;
  } else {
    return `игроков`;
  }
};
