const styles = {
  container: {
    background:
      "linear-gradient(315deg, rgb(69, 75, 205) 0%, rgba(159, 161, 198, 0.4) 50%, rgba(223, 223, 228, 0.3) 100%)",
    borderRadius: "20px",
    width: "90%",
    height: "100%",
    textAlign: "center",
    margin: "auto",
    padding: "100px 0"
  },
  title: {
    color: "white",
    fontWeight: 600,
    fontSize: "40px",
    marginBottom: "10px"
  },
  text: {
    color: "black",
    fontSize: "20px",
    marginTop: "10px"
  }
};

const Done = ({ address }) => {
  return (
    <div style={styles.container}>
      <p style={styles.title}>Done !</p>
      <p style={styles.text}>
        Your assets have been succesfully transferred to:<br></br>
        <span style={{ fontWeight: "600", color: "blue" }}>{address}</span>.
        <br></br>
      </p>
      <p style={styles.text}>Thank you for using Lepricon product.</p>
    </div>
  );
};

export default Done;
