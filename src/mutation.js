
export const GQL_MUTATION = `
type Mutation {
  addTask(title: String!): Task
  updateTask(id: Int!, title: String!): Task
  deleteTask(id: Int!): Task
  addUser(name: String!, email: String!, password: String!): User
}
`;
