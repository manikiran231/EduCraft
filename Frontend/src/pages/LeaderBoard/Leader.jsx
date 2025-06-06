import React from "react";
import "./Leader.css";

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

const Leader=() => {
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
          {leaderboardData.map((user, index) => (
            <tr key={user.username}>
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
