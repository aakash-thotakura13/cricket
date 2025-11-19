export const PageTitle = ({ title }) => {
  return (
    <header style={{
      backgroundColor: "#ccc",
      color: "#777",
      textShadow: "1px 1px 2px black",
      borderRadius: "5em",
      textAlign: "center",
    }}>
      <h1>{title}</h1>
    </header>
  )
};