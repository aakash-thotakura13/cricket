export const PageTitle = ({ title }) => {
  return (
    <p
      style={{
        background: "#ccc",
        color: "#444",
        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
        borderRadius: "2em",
        padding: "0.1em 0em",
        margin: "0.8em 0",
        textAlign: "center",
        fontSize: "1.5em",
        fontWeight: "bold",
      }}
    >
      {title}
    </p>
  );
};
