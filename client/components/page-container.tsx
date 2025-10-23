"use client";

export function PageContainer({ children }: { children: React.ReactNode }) {
  const container: React.CSSProperties = {
    height: "100vh", // exactly one screen height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    boxSizing: "border-box",
    background: "#fff",
    color: "#111",
  };

  return <div style={container}>{children}</div>;
}

export function MainContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const centerArea: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
    width: "100%",
  };

  return <div style={centerArea}>{children}</div>;
}

export function TopContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const topArea: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "12px",
  };

  return <div style={topArea}>{children}</div>;
}

export function BottomContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const bottomArea: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "12px",
  };

  return <div style={bottomArea}>{children}</div>;
}
