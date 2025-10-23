"use client";

export default function HeaderText({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStyle: React.CSSProperties = {
    fontSize: "clamp(28px, 6vw, 56px)",
    fontWeight: 800,
    textAlign: "center",
    margin: 0,
  };

  return <h1 style={headerStyle}>{children}</h1>;
}
