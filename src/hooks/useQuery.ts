import { useCallback, useEffect, useState } from "react";

export type UseQueryOptions<Data extends object> = {
  url: string;
  handlers?: {
    onSuccces?: (data: Data) => void;
    onFailure?: (data: Error) => void;
  };
};

export function useQuery<Data extends object>({
  url,
  handlers,
}: UseQueryOptions<Data>) {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const runQuery = useCallback(() => {
    setState("loading");
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then<Data>((r) => r.json())
      .then((data) => {
        setState("success");
        setError(undefined);

        if (data) {
          setData(data);
          handlers?.onSuccces?.(data);
        }
      })
      .catch((e) => {
        setState("error");
        setError(e);
        setData(undefined);
        handlers?.onFailure?.(e);
      });
  }, [url, handlers]);

  return {
    isIdle: state === "idle",
    isLoading: state === "loading",
    isError: state === "error",
    isSuccess: state === "success",
    data,
    error,
    fetch: runQuery,
  };
}
