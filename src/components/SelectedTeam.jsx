
export const SelectedTeam = ({ teamName }) => {
  return <p
    style={{
      fontSize: "1.2em",
      margin: "1em 0em",
      padding: "0.5em 1em",
      backgroundColor: "whitesmoke",
      color: "black",
      border: "1px solid #ccc",
      borderRadius: "5em", fontWeight: "600",
    }}
  >
    {teamName}
  </p>
}