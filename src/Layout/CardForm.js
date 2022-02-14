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
  const inputList = [
    { position: "front", placeholder: "Front side of card" },
    { position: "back", placeholder: "Back side of card" },
  ];
  return (
    <form onSubmit={handleSubmit}>
      {inputList.map((listItem, index) => {
        return (
          <div className="mb-3" key={index}>
            <label htmlFor={listItem.position} className="form-label">
              Front
            </label>
            <textarea
              value={formData[listItem.position]}
              id={listItem.position}
              name={listItem.position}
              type="text"
              className="form-control"
              placeholder={listItem.placeholder}
              onChange={handleChange}
            />
          </div>
        );
      })}
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
