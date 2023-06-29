import Nav from "../components/Nav/Nav";
import ProfileContainer from "../components/profileContainer/profileContainer";

export default async function Home() {
  return (
    <main>
      <Nav />
      <ProfileContainer />
    </main>
  );
}
