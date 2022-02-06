import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function CardForm({ deckId, saveCard, currentCard = { front: "", back: "" } }) {
  const [formData, setFormData] = useState(currentCard);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentCard.id) {
      await saveCard(formData);
      console.log("Submitted:", formData);
      history.push(`/decks/${deckId}`);
    } else {
      await saveCard(deckId, formData);
      console.log("Submitted:", formData);
      setFormData({ ...currentCard });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Front
        </label>
        <textarea
          value={formData.front}
          id="front"
          name="front"
          type="text"
          className="form-control"
          placeholder="Front side of card"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Back
        </label>
        <textarea
          value={formData.back}
          id="back"
          name="back"
          type="text"
          className="form-control"
          placeholder="Back side of card"
          onChange={handleChange}
        />
      </div>
      <Link to={`/decks/${deckId}`}>
        <button type="button" className="btn btn-secondary">
          {currentCard.id ? "Cancel" : "Done"}
        </button>
      </Link>
      <button type="submit" className="btn btn-primary m-1">
        Save
      </button>
    </form>
  );
}

export default CardForm;
