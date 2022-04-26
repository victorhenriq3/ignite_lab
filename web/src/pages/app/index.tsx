/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useMeQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts } from "../../graphql/generated/page";
import { ssrGetProducts } from "../../graphql/generated/pagePublic";
import { withApollo } from "../../lib/withApollo";

function Home({data}){
    const {user} = useUser()

    const {data: me} = useMeQuery()

    return (
        <div>
            <h1>Hello world</h1>
            <pre>
                {JSON.stringify(data.products, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(me, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>

            <a href="/api/auth/logout">Logout</a>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async (ctx) => {
        // getServerPageGetProducts({}, ctx)
        return {
            props: {}
        }
    }
});

export default withApollo(
    ssrGetProducts.withPage()(Home)
)