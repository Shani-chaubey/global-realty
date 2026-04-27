import BlogForm from "@/components/admin/BlogForm";
export const metadata = { title: "Edit Blog | Admin" };
export default async function Page({ params }) {
  const { id } = await params;
  return <BlogForm blogId={id} />;
}
