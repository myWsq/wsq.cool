import clsx from "clsx";
import { NextPage } from "next";
import NextImage from "next/image";
import { useRouter } from "next/router";
import useAsync from "../hooks/use-async";
import logoPic from "../public/logo.svg";
import { SECRET_TOKEN_KEY } from "../utils/fauna";

const LoginPage: NextPage = () => {
  const router = useRouter();

  const formControl = clsx("mb-5 flex flex-col");
  const formLabel = clsx("text-gray-600 mb-2");
  const formInput = clsx(
    "border shadow-sm px-3 h-10 text-gray-600 rounded focus:border-pink-500 focus:outline-none"
  );

  const onSubmit: React.ReactEventHandler = (e) => {
    e.preventDefault();
    const jsonFormData: any = {};
    const formData = new FormData(e.target as HTMLFormElement);

    formData.forEach((v, k) => {
      jsonFormData[k] = v;
    });

    validate(jsonFormData);
  };

  const { execute: validate, status: validateStatus } = useAsync(
    async (data: any) => {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { secretToken } = await res.json();
      localStorage.setItem(SECRET_TOKEN_KEY, secretToken);
      router.push("/admin");
    },
    false
  );

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 px-5">
      <div className="h-[18%]"></div>
      <NextImage src={logoPic} layout="fixed" alt="logo" />
      <form
        className="mt-14 w-96 bg-white px-5 md:px-8 py-6 rounded-lg max-w-full border"
        onSubmit={onSubmit}
      >
        <div className={formControl}>
          <label className={formLabel}>用户名:</label>
          <input className={formInput} name="username" type="text"></input>
        </div>
        <div className={formControl}>
          <label className={formLabel}>密码</label>
          <input className={formInput} name="password" type="password"></input>
        </div>
        <button
          type="submit"
          disabled={validateStatus === "pending"}
          className={clsx(
            "block w-full text-white font-medium h-11 rounded",
            validateStatus === "error" ? "bg-red-400" : "bg-gray-800"
          )}
        >
          登录
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
