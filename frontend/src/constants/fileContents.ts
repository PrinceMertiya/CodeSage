export const fileContents: Record<string, string> = {
  navbar: `import React from "react";

export default function Navbar() {
  return (
    <header>
      <h1>CodeSage</h1>
    </header>
  );
}`,

  hero: `export default function Hero() {
  return (
    <section>
      Hero Section
    </section>
  );
}`,

  dashboard: `export default function Dashboard() {
  return <div>Dashboard</div>;
}`,
};