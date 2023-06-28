import Nav from "./components/Nav/Nav";
import MainPage from "./components/MainPage/MainPage";

export default async function Home() {
  return (
    <main>
      <Nav />
      <MainPage />
    </main>
  );
}
