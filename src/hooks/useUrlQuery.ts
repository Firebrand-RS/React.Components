import { useSubmit } from 'react-router-dom';

export function useUrlQuery() {
  const submit = useSubmit();
  const searchParams = new URLSearchParams();
  return (queries: { key: string; value: string }[]) => {
    for (const query of queries) {
      const { key, value } = query;
      searchParams.append(key, value);
    }
    submit(searchParams);
  };
}
