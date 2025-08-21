import PaymentPage from "@/component/PaymentPage";

export default function UsernamePage({ params }) {
  const { username } = params; // no await needed
  return <PaymentPage username={username} />;
}