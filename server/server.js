require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { readFileSync } = require('fs');
const typeDefs = readFileSync('./schema/typeDefs.graphql', 'utf8');
const resolvers = require('./schema/resolvers');
const express = require('express');
const http = require('http');
const cors = require('cors');
const db = require('./config/connection');
const session = require('express-session');

const app = express();
const httpServer = http.createServer(app);

const api_routes = require('./routes/api_routes');
const auth_routes = require('./routes/auth_routes');
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use(express.static('../client/dist'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.PORT ? true : false }
}));

app.use('/api', api_routes);
app.use('/auth', auth_routes);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await server.start();

  app.use(
    '/',
    cors(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ session: req.session }),
    }),
  );

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
}

db.once('open', async () => {
  await startServer();

  console.log('Server started on port %s', PORT);
});
