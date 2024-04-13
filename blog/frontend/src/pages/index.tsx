import type { GetServerSideProps } from "next";
import { urqlClient } from "@/lib/gql-requests";
import { gql } from "urql";

type Props = {
  posts: {
    id: string;
    title: string;
  }[];
};

export default function Home(props: Props) {
  return (
    <main className="flex justify-center">
      <div className="flex-row">
        <h1 className="text-5xl p-4">Hello, GraphQL</h1>
        <ul>
          {props.posts.map((post) => (
            <li key={post.id} className="p-2">
              id: {post.id} title: {post.title}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient();
    const postsQuery = gql`
      query {
        posts {
          id
          title
        }
      }
    `;
    const result = await client.query(postsQuery, {}).toPromise();
    return {
      props: {
        posts: result.data.posts,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};
