"use client";
import Nav from "../components/Nav/Nav";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchPostPage from "../components/SearchPostPage/SearchPostPage";
//import SearchBar from "../components/SearchPostPage/SearchBar";

export default async function ClassesPage() {
  return (
    <main>
      <Nav />
      <SearchBar />
      <SearchPostPage />
    </main>
  );
}
