import { useQuery } from "@apollo/client";
import { BOOKS } from "./api/books";

export function Books() {
  const { loading, error, data } = useQuery(BOOKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  // どうやって型つける？
  return data.books.map(({ title, author }) => (
    <div key={title}>
      <p>
        {title} by {author}
      </p>
    </div>
  ));
}
