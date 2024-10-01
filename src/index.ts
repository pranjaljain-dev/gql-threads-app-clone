import express from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

async function init(){
const app = express()
const PORT = Number(process.env.PORT) || 8001;

app.use(express.json())

    //Create GraphQL Server
const gqlServer = new ApolloServer({
    //Schema
    typeDefs: `
        type Query {
            hello: String,
            random: Int,
            say(name: String): String
        }
    `, 
    //Actual functions that will be executed
    resolvers: {
        Query: {
            hello: () => `Hey there, I am a gql server`,
            random: () => `${2+9}`,
            say: (_, {name}: {name: string}) => `Hey ${name}, How are you?`
        },
    },
})

//Start The gql Server
await gqlServer.start()

app.get('/', (req, res) => {
    res.json({message: 'Server is up & running'})
})

app.use('/graphql', expressMiddleware(gqlServer))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

init();
