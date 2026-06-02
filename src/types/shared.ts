export type Post = {
  id: number;
  body: string;
  title: string;
  userId?: number;
};

export type PostFormValues = Pick<Post, "body" | "title">;

export type PostFormProps = {
  initialValues?: PostFormValues;
  onSubmit: (data: PostFormValues) => void | Promise<void>;
  submitText: string;
  clearOnSubmit: boolean;
};
