import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api/index";

function DeckForm({ deckInfo = { name: "", description: "" } }) {
  const [name, setName] = useState(deckInfo.name);
  const [description, setDescription] = useState(deckInfo.description);
  const history = useHistory();

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  async function handleSubmit(event) {
    event.preventDefault();
    if (deckInfo.id) {
      const formData = { ...deckInfo, name, description };
      const response = updateDeck(formData);
      console.log(await response);
      setName(deckInfo.name);
      setDescription(deckInfo.description);
      history.push(`/decks/${deckInfo.id}`);
    } else {
      const formData = { name, description };
      const response = createDeck(formData);
      console.log(await response);
      setName(deckInfo.name);
      setDescription(deckInfo.description);
      history.push("/");
    }
  }

  function handleCancel() {
    setName("");
    setDescription("");
    deckInfo.id ? history.push(`/decks/${deckInfo.id}`) : history.push("/");
  }

  return (
    <form id="deck-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="form-control"
          placeholder="Deck Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          className="form-control"
          placeholder="Brief description of the deck"
          rows="4"
        ></textarea>
      </div>

      <button
        type="button"
        className="btn btn-secondary "
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary mx-2">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
