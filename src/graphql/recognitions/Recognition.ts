import recognitions from "./data";
import * as types from "./types";

class Recognition {
  static all() {
    return recognitions;
  }

  static create(_obj: types.Parent, args: types.RecognitionInput) {
    const { from, to, message } = args;
    return {
      from,
      to,
      message
    };
  }
}

export default Recognition;
