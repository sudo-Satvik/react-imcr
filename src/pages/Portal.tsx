import { Link } from "react-router-dom";

export default function Portal() {
  const sections = [
    {
      title: "Mini Projects",
      items: [
        { name: "Mini Projects (App.tsx components)", path: "/mini-projects" },
        { name: "Advance Todo App", path: "/advance-todo" },
        { name: "Advance Calculator App", path: "/advance-calculator" },
        { name: "GitHub Profile Finder", path: "/github-profile-finder" },
        { name: "Search Autocomplete with API Integration", path: "/search-autocomplete" },
        { name: "Tic Tac Toe", path: "/tic-tac-toe" },
        { name: "Feature Flag Implementation", path: "/feature-flag" },
        { name: "Scroll to Top & Bottom", path: "/scroll-to-top-bottom" },
        { name: "Scroll to Particular Section", path: "/scroll-to-section" },
      ]
    },
    {
      title: "Custom Hooks",
      items: [
        { name: "useFetch", path: "/use-fetch" },
        { name: "useOnClickOutside", path: "/use-onclick-outside" },
        { name: "useWindowResize / useResponsive / useDevice", path: "/use-window-resize" },
      ]
    },
    {
      title: "Projects",
      items: [
        { name: "Weather App", path: "/weather-app" },
        { name: "Food Recipe App", path: "/food-recipe-app" },
        { name: "Shopping Cart App", path: "/shopping-cart-app" },
        { name: "Expense Tracker App", path: "/expense-tracker-app" },
        { name: "MERN Stack Blog App", path: "/mern-blog-app" },
      ]
    }
  ];

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif", backgroundColor: "#fdfdfd", color: "#333", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#111", fontSize: "2.5rem", fontWeight: "bold" }}>Projects Portal</h1>
      
      {sections.map((section, idx) => (
        <div key={idx} style={{ marginBottom: "40px" }}>
          <h2 style={{ borderBottom: "2px solid #eaeaea", paddingBottom: "10px", marginBottom: "20px", color: "#444", fontSize: "1.5rem" }}>
            {section.title}
          </h2>
          <ul style={{ listStyleType: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <Link
                  to={item.path}
                  style={{
                    display: "block",
                    padding: "15px",
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "#0070f3",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#0070f3";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
