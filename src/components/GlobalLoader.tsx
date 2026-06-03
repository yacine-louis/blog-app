import { useIsFetching } from "@tanstack/react-query";

export default function GlobalLoader() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="absolute top-2 right-2">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
    </div>
  );
}
