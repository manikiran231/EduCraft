import React from "react";
function Logout() {
    return (
        <button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  style={{
    marginTop: "20px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "8px",
  }}
>
  Logout
</button>

    );
}
export default Logout;