import type { NextPage, GetServerSideProps } from "next";
import NextImage from "next/image";
import { createFaunaClient } from "../utils/fauna";
import logoPic from "../public/logo.svg";

export const getServerSideProps: GetServerSideProps = async () => {
  const { client, q } = createFaunaClient();

  const { data: posts } = await client.query<any>(
    q.Map(
      q.Paginate(q.Documents(q.Collection("Post"))),
      q.Lambda((x) => q.Select(["data"], q.Get(x)))
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
    <div className="h-screen flex flex-col justify-center items-center">
      <NextImage className="opacity-60" src={logoPic} alt="logo"></NextImage>
      <h1 className="mt-12 text-5xl opacity-50 italic">🚧 持续建设中...</h1>
    </div>
  );
};

export default Home;
