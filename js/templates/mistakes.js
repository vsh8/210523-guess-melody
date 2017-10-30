export default (gameState) => {
  return new Array(gameState.wrongAnswersNumber)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``);
};
