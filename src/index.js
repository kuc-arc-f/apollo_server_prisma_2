const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import LibTask from '../lib/LibTask'
import LibUser from '../lib/LibUser'
import scheme from './scheme'

const typeDefs = scheme.getTypeDefs();
/* resolvers */
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    async task(parent, args, context, info){
      return await LibTask.getTask(args.id);
    },
    tasks:async () => {
      return await LibTask.getItems();
    },
    /* user */    
    user: async(parent, args, context, info) => {
      return await LibUser.getUser(args.id);
    }, 
    userValid: async(parent, args, context, info) => {
      const user = await LibUser.validUser(args);
      return user;
    }, 
  },
  Mutation: {
    addTask: async (parent, args, context) => {
      const ret = await LibTask.addTask(args)
      return ret
    },
    updateTask: async (parent, args, context) => {
      const ret = await LibTask.updateTask(args)
      return ret
    },
    deleteTask: async (parent, args, context) => {
      const ret = await LibTask.deleteTask(args)
      return ret
    },
    /* user */    
    addUser: async (parent, args, context) => {
      const ret = await LibUser.addUser(args)
      return ret
    },

  }
};

/* serever-Start */
const server = new ApolloServer({ typeDefs, resolvers });
//await server.start();
const app = express();
server.applyMiddleware({ app });
// ENV
//console.log(app.get('env'));
//const config = require('../config.json')[app.get('env')];
app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
