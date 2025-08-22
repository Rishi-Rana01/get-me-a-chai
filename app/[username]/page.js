import PaymentPage from "@/component/PaymentPage";

export default async function UsernamePage({ params }) {
  const { username } = await params; // no await needed
  return <PaymentPage username={username} />;
}