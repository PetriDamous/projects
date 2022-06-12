const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const startApolloServer = async () => {
  const PORT = 4000;

  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app, path: `${server.graphqlPath}` });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startApolloServer();
