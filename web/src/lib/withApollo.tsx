import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { NextPage } from "next";

export const withApollo = (Component: NextPage) => {
    return function Provider(props: any){
        return (
            <ApolloProvider client={getApolloCliente(props.apolloState)}>
                <Component {...props} />
            </ApolloProvider>
        )
    }
}

function getApolloCliente(initialState?: NormalizedCacheObject){
    const httpLink = createHttpLink({
        uri: 'http://localhost:3332/graphql',
        fetch
    })
    
    const cache = new InMemoryCache().restore(initialState ?? {})
    
    return new ApolloClient({
        link: from([httpLink]),
        cache
    })
}

