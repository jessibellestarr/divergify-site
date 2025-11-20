import React from "react";

export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "1rem" }}>
      {children}
    </div>
  );
}

