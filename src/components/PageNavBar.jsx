
export const PageNavBar = ({ displayInnings, setDisplayInnings }) => {

  return (
    <nav style={styles.navBar}
    >
      <button
        onClick={() => setDisplayInnings(true)}
        style={{ ...(displayInnings ? styles.activeStyle : styles.inactiveStyle) }}
      >
        Innings One
      </button>
      <button
        onClick={() => setDisplayInnings(false)}
        style={{ ...(!displayInnings ? styles.activeStyle : styles.inactiveStyle) }}
      >
        Innings Two
      </button>
    </nav>
  )
}

const styles = {
  navBar: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    overflow: "hidden",
    fontWeight: "bold",
  },
  button: {
    fontSize: "0.9em",
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    textShadow: "1px 1px 2px #aaa",
  },
  activeStyle: {
    backgroundColor: "#7e7e7eff",
    color: "white",
  },
  inactiveStyle: {},
}