export const inflectSingularNominativeNeuterNumber = (num) => {
  return num % 10 !== 3 || num % 100 === 13 ? `${num}-ое` : `${num}-ье`;
};

const inflectGenitive = (num, wordFirstForm, wordSecondForm) => {
  return num % 10 === 1 && num % 100 !== 11 ? wordFirstForm : wordSecondForm;
};

const inflectAccusative = (num, wordFirstForm, wordSecondForm, wordThirdForm) => {
  if (num % 10 === 1 && num % 100 !== 11) {
    return wordFirstForm;
  } else if ([2, 3, 4].includes(num % 10) && (num % 100 < 10 || num % 100 > 20)) {
    return wordSecondForm;
  }
  return wordThirdForm;
};

export const inflectGenitivePlayer = (num) => {
  return inflectGenitive(num, `игрока`, `игроков`);
};

export const inflectAccusativeNumber = (num, baseWord) => {
  return inflectAccusative(num, `${baseWord}у`, `${baseWord}ы`, baseWord);
};

export const inflectAccusativeScore = (num) => {
  return inflectAccusative(num, `балл`, `балла`, `баллов`);
};

export const inflectGenitiveFast = (num) => {
  return inflectGenitive(num, `быстрый`, `быстрых`);
};

export const inflectAccusativeMistake = (num) => {
  return inflectAccusative(num, `ошибку`, `ошибки`, `ошибок`);
};
