import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PollDetails.css";

function PollDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchPoll();
  }, [id]);

  const fetchPoll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/polls/${id}`
      );
      setPoll(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load poll");
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedOption) {
      setError("Please select an option");
      return;
    }

    setVoting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/polls/${id}/vote`,
        { optionIndex: selectedOption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHasVoted(true);
      fetchPoll();
      setSelectedOption(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to vote");
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return <div className="poll-container"><p>Loading poll...</p></div>;
  }

  if (error && !poll) {
    return (
      <div className="poll-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Polls
        </button>
      </div>
    );
  }

  const totalVotes = poll?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0;

  return (
    <div className="poll-container">
      <button onClick={() => navigate("/")} className="back-btn">
        ← Back to Polls
      </button>
      <div className="poll-box">
        <h2>{poll?.question}</h2>
        {poll?.description && <p className="description">{poll.description}</p>}
        <div className="poll-meta">
          <span>Created by: {poll?.creator?.username}</span>
          <span>Total Votes: {totalVotes}</span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="options-container">
          {poll?.options.map((option, index) => (
            <div key={index} className="option-item">
              <label className="option-label">
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  disabled={hasVoted}
                />
                <span className="option-text">{option.text}</span>
              </label>
              <div className="option-stats">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: totalVotes > 0 ? `${(option.votes / totalVotes) * 100}%` : "0%",
                    }}
                  ></div>
                </div>
                <span className="vote-count">
                  {option.votes} vote{option.votes !== 1 ? "s" : ""} (
                  {totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        {!hasVoted && (
          <button
            onClick={handleVote}
            disabled={voting || !selectedOption}
            className="vote-btn"
          >
            {voting ? "Voting..." : "Vote"}
          </button>
        )}

        {hasVoted && <p className="voted-message">✓ You have voted</p>}
      </div>
    </div>
  );
}

export default PollDetails;