// Code generated by Prisma (prisma@1.34.8). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateTodo {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createTodo(data: TodoCreateInput!): Todo!
  updateTodo(data: TodoUpdateInput!, where: TodoWhereUniqueInput!): Todo
  updateManyTodoes(data: TodoUpdateManyMutationInput!, where: TodoWhereInput): BatchPayload!
  upsertTodo(where: TodoWhereUniqueInput!, create: TodoCreateInput!, update: TodoUpdateInput!): Todo!
  deleteTodo(where: TodoWhereUniqueInput!): Todo
  deleteManyTodoes(where: TodoWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  todo(where: TodoWhereUniqueInput!): Todo
  todoes(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo]!
  todoesConnection(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TodoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  todo(where: TodoSubscriptionWhereInput): TodoSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Todo {
  id: ID!
  tenantId: String!
  status: TodoStatus!
  note: String!
  createdAt: DateTime
  updatedAt: DateTime
  author: User!
}

type TodoConnection {
  pageInfo: PageInfo!
  edges: [TodoEdge]!
  aggregate: AggregateTodo!
}

input TodoCreateInput {
  id: ID
  tenantId: String!
  status: TodoStatus!
  note: String!
  author: UserCreateOneWithoutTodosInput!
}

input TodoCreateManyWithoutAuthorInput {
  create: [TodoCreateWithoutAuthorInput!]
  connect: [TodoWhereUniqueInput!]
}

input TodoCreateWithoutAuthorInput {
  id: ID
  tenantId: String!
  status: TodoStatus!
  note: String!
}

type TodoEdge {
  node: Todo!
  cursor: String!
}

enum TodoOrderByInput {
  id_ASC
  id_DESC
  tenantId_ASC
  tenantId_DESC
  status_ASC
  status_DESC
  note_ASC
  note_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TodoPreviousValues {
  id: ID!
  tenantId: String!
  status: TodoStatus!
  note: String!
  createdAt: DateTime
  updatedAt: DateTime
}

input TodoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  tenantId: String
  tenantId_not: String
  tenantId_in: [String!]
  tenantId_not_in: [String!]
  tenantId_lt: String
  tenantId_lte: String
  tenantId_gt: String
  tenantId_gte: String
  tenantId_contains: String
  tenantId_not_contains: String
  tenantId_starts_with: String
  tenantId_not_starts_with: String
  tenantId_ends_with: String
  tenantId_not_ends_with: String
  status: TodoStatus
  status_not: TodoStatus
  status_in: [TodoStatus!]
  status_not_in: [TodoStatus!]
  note: String
  note_not: String
  note_in: [String!]
  note_not_in: [String!]
  note_lt: String
  note_lte: String
  note_gt: String
  note_gte: String
  note_contains: String
  note_not_contains: String
  note_starts_with: String
  note_not_starts_with: String
  note_ends_with: String
  note_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [TodoScalarWhereInput!]
  OR: [TodoScalarWhereInput!]
  NOT: [TodoScalarWhereInput!]
}

enum TodoStatus {
  Open
  Resolved
}

type TodoSubscriptionPayload {
  mutation: MutationType!
  node: Todo
  updatedFields: [String!]
  previousValues: TodoPreviousValues
}

input TodoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TodoWhereInput
  AND: [TodoSubscriptionWhereInput!]
}

input TodoUpdateInput {
  tenantId: String
  status: TodoStatus
  note: String
  author: UserUpdateOneRequiredWithoutTodosInput
}

input TodoUpdateManyDataInput {
  tenantId: String
  status: TodoStatus
  note: String
}

input TodoUpdateManyMutationInput {
  tenantId: String
  status: TodoStatus
  note: String
}

input TodoUpdateManyWithoutAuthorInput {
  create: [TodoCreateWithoutAuthorInput!]
  delete: [TodoWhereUniqueInput!]
  connect: [TodoWhereUniqueInput!]
  set: [TodoWhereUniqueInput!]
  disconnect: [TodoWhereUniqueInput!]
  update: [TodoUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [TodoUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [TodoScalarWhereInput!]
  updateMany: [TodoUpdateManyWithWhereNestedInput!]
}

input TodoUpdateManyWithWhereNestedInput {
  where: TodoScalarWhereInput!
  data: TodoUpdateManyDataInput!
}

input TodoUpdateWithoutAuthorDataInput {
  tenantId: String
  status: TodoStatus
  note: String
}

input TodoUpdateWithWhereUniqueWithoutAuthorInput {
  where: TodoWhereUniqueInput!
  data: TodoUpdateWithoutAuthorDataInput!
}

input TodoUpsertWithWhereUniqueWithoutAuthorInput {
  where: TodoWhereUniqueInput!
  update: TodoUpdateWithoutAuthorDataInput!
  create: TodoCreateWithoutAuthorInput!
}

input TodoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  tenantId: String
  tenantId_not: String
  tenantId_in: [String!]
  tenantId_not_in: [String!]
  tenantId_lt: String
  tenantId_lte: String
  tenantId_gt: String
  tenantId_gte: String
  tenantId_contains: String
  tenantId_not_contains: String
  tenantId_starts_with: String
  tenantId_not_starts_with: String
  tenantId_ends_with: String
  tenantId_not_ends_with: String
  status: TodoStatus
  status_not: TodoStatus
  status_in: [TodoStatus!]
  status_not_in: [TodoStatus!]
  note: String
  note_not: String
  note_in: [String!]
  note_not_in: [String!]
  note_lt: String
  note_lte: String
  note_gt: String
  note_gte: String
  note_contains: String
  note_not_contains: String
  note_starts_with: String
  note_not_starts_with: String
  note_ends_with: String
  note_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  author: UserWhereInput
  AND: [TodoWhereInput!]
}

input TodoWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  tenantId: String!
  name: String!
  createdAt: DateTime
  updatedAt: DateTime
  todos(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  tenantId: String!
  name: String!
  todos: TodoCreateManyWithoutAuthorInput
}

input UserCreateOneWithoutTodosInput {
  create: UserCreateWithoutTodosInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTodosInput {
  id: ID
  tenantId: String!
  name: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  tenantId_ASC
  tenantId_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  tenantId: String!
  name: String!
  createdAt: DateTime
  updatedAt: DateTime
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  tenantId: String
  name: String
  todos: TodoUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  tenantId: String
  name: String
}

input UserUpdateOneRequiredWithoutTodosInput {
  create: UserCreateWithoutTodosInput
  update: UserUpdateWithoutTodosDataInput
  upsert: UserUpsertWithoutTodosInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTodosDataInput {
  tenantId: String
  name: String
}

input UserUpsertWithoutTodosInput {
  update: UserUpdateWithoutTodosDataInput!
  create: UserCreateWithoutTodosInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  tenantId: String
  tenantId_not: String
  tenantId_in: [String!]
  tenantId_not_in: [String!]
  tenantId_lt: String
  tenantId_lte: String
  tenantId_gt: String
  tenantId_gte: String
  tenantId_contains: String
  tenantId_not_contains: String
  tenantId_starts_with: String
  tenantId_not_starts_with: String
  tenantId_ends_with: String
  tenantId_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  todos_some: TodoWhereInput
  AND: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  name: String
}
`