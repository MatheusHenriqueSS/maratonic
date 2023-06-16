import Nav from "./components/Nav/Nav";
import MainPage from "./components/MainPage/MainPage";

export default function Home() {
  return (
    <div style={{alignContent: "flex-start"}}>
      <Nav />
      <MainPage />
    </div>
  );
}
