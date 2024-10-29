// pages/index.tsx
import UserCard from "../components/UserCard";
import UserCardServer from "../components/UserCardServer";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Direct API Version</h2>
          <UserCard />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Server API Version</h2>
          <UserCardServer />
        </div>
      </div>
    </main>
  );
}
