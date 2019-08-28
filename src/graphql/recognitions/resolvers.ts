import Recognition from "./Recognition";
import * as types from "./types";

const resolvers = {
  Query: {
    recognitions: () => Recognition.all()
  },
  Mutation: {
    recognition: (obj: types.Parent, args: types.RecognitionInput) =>
      Recognition.create(obj, args)
  }
};

export default resolvers;
