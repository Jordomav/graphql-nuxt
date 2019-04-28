import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import {createConnection, useContainer} from "typeorm";
import {buildSchema} from "type-graphql";
import { User } from "./entity/User";
import { JwtService } from "./services/jwt.service";

useContainer(Container);

createConnection().then(async connection => {
    const jwt: JwtService = new JwtService();

    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/*.ts'],
        container: Container,
    });

    const server = new ApolloServer({ schema, context: async ({ req }) => {
        const headers: object = req.headers;
        const decoded = jwt.decode(headers);
        return { user: await connection.getRepository(User).findOne(decoded)}
    }
    });

    const { url } = await server.listen(4000);

    console.log(`Server listening on ${url}`);

}).catch(error => console.log(error));
