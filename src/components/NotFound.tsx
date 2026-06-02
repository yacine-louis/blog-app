export default function NotFound({ message }: { message: string }) {
  return (
    <div>
      <h1>Not Found!</h1>
      <p>{message}</p>
    </div>
  );
}
