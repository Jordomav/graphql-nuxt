import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import {createConnection, useContainer} from "typeorm";
import {buildSchema} from "type-graphql";

useContainer(Container);

createConnection().then(async connection => {

    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/*.ts'],
        container: Container,
    });

    const server = new ApolloServer({ schema });

    const { url } = await server.listen(3000);

    console.log(`Server listening on ${url}`);

}).catch(error => console.log(error));
