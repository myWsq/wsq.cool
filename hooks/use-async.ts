import { useCallback, useEffect, useState } from "react";

const useAsync = <T, P extends unknown[]>(
  asyncFunction: (...args: P) => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: P) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setValue(response);
        setStatus("success");
        return response;
      } catch (error: any) {
        setError(error);
        setStatus("error");
      }
    },
    // 不将函数添加进来, 方便直接书写函数，防止出现死循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (immediate) {
      // @ts-ignore: 奇怪的类型报错，感觉像是 TS 的 Bug
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

export default useAsync;
