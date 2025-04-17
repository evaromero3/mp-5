"use client"; // Make sure this page is a client component 

import NewLinkForm from "@/components/NewLinkForm"; 
export default function Home() {
  return (
    <main style={{ padding: "2rem", 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center" }}>
      <h1>Welcome to Your URL Shortener</h1>
      <NewLinkForm />
    </main>
  );
}
