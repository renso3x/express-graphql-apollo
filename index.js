const express = require("express");
const morgan = require("morgan");
const { ApolloServer } = require("apollo-server-express");

var winston = require("./config/winston");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const PORT = 4000;

const app = express();

app.use(morgan("combined"));
app.use(morgan("combined", { stream: winston.stream }));

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
