
export const PageNavBar = ({ displayInnings, setDisplayInnings }) => {
  return (
    <nav style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", fontSize: "1.3em", fontWeight: "bold", borderRadius: "1em", overflow: "hidden", }}>
      <li style={{ backgroundColor: displayInnings === true ? "#7e7e7eff" : "",  padding: "0.25em auto", }} onClick={() => setDisplayInnings(true)}>Innings One</li>
      <li style={{ backgroundColor: displayInnings === false ? "#7e7e7eff" : "", padding: "0.25em auto", }} onClick={() => setDisplayInnings(false)}>Innings Two</li>
    </nav>
  )
}