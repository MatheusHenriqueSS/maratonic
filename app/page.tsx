import Nav from "./components/Nav/Nav";
import MainPage from "./components/MainPage/MainPage";
import { getServerSession } from "next-auth/next";

export default async function Home() {
    
  return (
    <main>
      <Nav />
      <MainPage />
    </main>
  );
}
