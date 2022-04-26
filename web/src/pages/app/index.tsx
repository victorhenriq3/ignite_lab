/* eslint-disable @next/next/no-html-link-for-pages */
import { gql, useQuery } from "@apollo/client";
import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

const PRODUCTS_QUERY = gql`
    query GetProducts {
        products{
            id
            title
        }
    }
`

export default function Home(){
    const {user} = useUser()

    const {data, loading, error} = useQuery(PRODUCTS_QUERY)

    return (
        <div>
            <h1>Hello world</h1>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>

            <a href="/api/auth/logout">Logout</a>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const token = getAccessToken(req, res);

    console.log(token);
    

    return {
        props: {}
    }
};