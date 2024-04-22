import { urqlClient } from "@/lib/gql-requests";
import { PostIndexPageDocument, PostModel } from "@/graphql/generated/graphql";

type Props = {
  posts: Partial<PostModel>[];
};

export default function Home(props: Props) {
  return (
    <main className="flex justify-center">
      <div className="flex-row">
        <h1 className="text-5xl p-4">Hello, GraphQL</h1>
        <ul>
          {props.posts.map((post) => (
            <li key={post.id} className="p-2">
              title: {post.title} type: {post.type}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const client = await urqlClient();
    const result = await client.query(PostIndexPageDocument, {}).toPromise();
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
}
