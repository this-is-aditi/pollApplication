import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePoll.css";

function CreatePoll() {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    options: ["", ""],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuestionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      setFormData((prev) => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.question.trim()) {
      setError("Question is required");
      return;
    }

    if (formData.options.some((opt) => !opt.trim())) {
      setError("All options must be filled");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/polls",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/poll/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-poll-container">
      <div className="create-poll-box">
        <h2>Create a New Poll</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="question">Poll Question</label>
            <input
              type="text"
              id="question"
              value={formData.question}
              onChange={handleQuestionChange}
              required
              placeholder="What is your poll question?"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Add more details about your poll"
              rows="3"
            ></textarea>
          </div>
          <div className="options-section">
            <h3>Poll Options</h3>
            {formData.options.map((option, index) => (
              <div key={index} className="option-group">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="add-option-btn"
            >
              + Add Option
            </button>
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Creating..." : "Create Poll"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePoll;