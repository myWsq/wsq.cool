import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAsync from "../hooks/use-async";
import { createFaunaClient } from "../utils/fauna";

const AdminPage: NextPage<{
  posts: any[];
}> = (props) => {
  const { status, error } = useAsync(async () => {
    const { client } = createFaunaClient();
    await client.ping();
  });

  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [error, router]);

  if (status === "success") {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-5xl">🚧 持续建设中...</h1>
        {JSON.stringify(props.posts)}
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center text-5xl text-gray-500 italic">
      加载中...
    </div>
  );
};

export default AdminPage;
