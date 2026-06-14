import type { PostFormProps } from "../types/shared";
import { z } from "zod";

const defaultFormValues = {
  title: "",
  body: "",
};

const formDataSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export default function PostForm({
  initialValues = defaultFormValues,
  onSubmit,
  submitText,
  clearOnSubmit,
}: PostFormProps) {
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {
      title: formData.get("title"),
      body: formData.get("body"),
    };

    const result = formDataSchema.safeParse(values);
    if (!result.success) {
      return;
    }
    await onSubmit(result.data);

    if (clearOnSubmit) {
      e.target.reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Title"
        className="border rounded p-2"
        defaultValue={initialValues.title}
        name="title"
      />

      <textarea
        placeholder="Body"
        className="border rounded p-2 min-h-40"
        defaultValue={initialValues.body}
        name="body"
      />

      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        {submitText}
      </button>
    </form>
  );
}
