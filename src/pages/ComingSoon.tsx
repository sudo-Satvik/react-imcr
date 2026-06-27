import { useLocation, Link } from "react-router-dom";

const ComingSoon = () => {
  const location = useLocation();
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>{location.pathname}</h2>
      <p style={{ margin: "20px 0" }}>This project is coming soon!</p>
      <Link to="/" style={{ color: "#0070f3", textDecoration: "none" }}>&larr; Back to Portal</Link>
    </div>
  );
};

export default ComingSoon;
