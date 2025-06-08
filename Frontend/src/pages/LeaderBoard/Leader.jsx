import React from "react";
import "./Leader.css";

// Original leaderboard data
const leaderboardData = [
  { username: "arjun_verma", score: 980 },
  { username: "priya_sharma", score: 920 },
  { username: "rahul_gupta", score: 890 },
  { username: "ananya_singh", score: 870 },
  { username: "vikram_patel", score: 850 },
  { username: "isha_kapoor", score: 830 },
  { username: "siddharth_jain", score: 800 },
  { username: "neha_rathore", score: 780 },
  { username: "amit_choudhary", score: 770 },
  { username: "tanvi_mehra", score: 760 },
];

// Add your username with a random score (e.g., 865)
const userEntry = { username: "manikiran231", score: 865 };

// Combine and sort by score descending
const updatedLeaderboard = [...leaderboardData, userEntry].sort((a, b) => b.score - a.score);

const Leader = () => {
  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {updatedLeaderboard.map((user, index) => (
            <tr key={user.username} className={user.username === "manikiran231" ? "highlight" : ""}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leader;
