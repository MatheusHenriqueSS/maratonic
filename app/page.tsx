import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Nav from "./components/Nav/Nav";
import MainPage from "./components/MainPage/MainPage";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Nav is_logged={session?.user != null} />
      <MainPage />
    </main>
  );
}
