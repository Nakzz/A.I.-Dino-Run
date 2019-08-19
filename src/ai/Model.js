import config from "../main";

export default class Model {
    init() {
      throw new Error(
        'Abstract method must be implemented in the derived class.'
      );
    }
    predict(inputXs) {
      throw new Error(
        'Abstract method must be implemented in the derived class.'
      );
    }
    predictSingle(inputX) {
      return this.predict([inputX]);
    }
    train(inputXs, inputYs) {
      throw new Error(
        'Abstract method must be implemented in the derived class.'
      );
    }
    fit(inputXs, inputYs, iterationCount = config.ITER_NUM) {
      for (let i = 0; i < iterationCount; i += 1) {
        this.train(inputXs, inputYs);
      }
    }
  }