import { gql } from "apollo-server";

const typeDef = gql`
  type Recognition {
    from: Int
    to: [Int]
    message: String
  }

  input RecognitionInput {
    from: Int!
    to: Int!
    message: String!
  }

  extend type Query {
    recognitions(from: Int, to: [Int]): [Recognition]
  }

  extend type Mutation {
    recognition(recognition: RecognitionInput): Recognition
  }
`;

export default typeDef;
