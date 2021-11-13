import type { NextPage, GetServerSideProps } from "next";
import { createFaunaClient } from "../utils/fauna";

export const getServerSideProps: GetServerSideProps = async () => {
  const { client, q } = createFaunaClient();

  const { data: posts } = await client.query<any>(
    q.Map(
      q.Paginate(q.Documents(q.Collection("Post"))),
      q.Lambda((x) => q.Select(['data'], q.Get(x)))
    )
  );

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<{
  posts: any[];
}> = (props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-5xl">🚧 持续建设中...</h1>
    </div>
  );
};

export default Home;
