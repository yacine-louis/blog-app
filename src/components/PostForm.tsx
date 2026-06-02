import { useState } from "react";
import type { PostFormProps, PostFormValues } from "../types/shared";

export default function PostForm({
  initialData,
  onSubmit,
  submitText = "Submit",
}: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(
    initialData ?? {
      title: "",
      body: "",
    },
  );

  const setValue = <K extends keyof PostFormValues>(
    field: K,
    value: PostFormValues[K],
  ) => {
    setValues((old) => ({ ...old, [field]: value }));
  };

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    await onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={values.title}
        onChange={(e) => setValue("title", e.target.value)}
        className="border rounded p-2"
      />

      <textarea
        placeholder="Body"
        value={values.body}
        onChange={(e) => setValue("body", e.target.value)}
        className="border rounded p-2 min-h-40"
      />

      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        {submitText}
      </button>
    </form>
  );
}
