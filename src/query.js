
export const GQL_QUERY = `
  type Query {
    hello: String
    task(id: Int): Task
    tasks: [Task]    
    user(id: Int): User
    users: [User]    
    userValid(email: String!, password: String!): User
  }
`;