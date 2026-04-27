import PropertyForm from "@/components/admin/PropertyForm";

export const metadata = { title: "Edit Property | Admin" };

export default async function Page({ params }) {
  const { id } = await params;
  return <PropertyForm propertyId={id} />;
}
