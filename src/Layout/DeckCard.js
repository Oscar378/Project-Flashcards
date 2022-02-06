// import { Link, useHistory } from "react-router-dom";
import React from "react";
import { deleteDeck } from "../utils/api/index";
import { Link } from "react-router-dom";

function DeckCard({ id, name, description, cards }, removeDeckFromList) {
  async function handleDeckDelete(event) {
    const targetDeck = event.target.value;
    if (window.confirm("Do you really want to delete?")) {
      await deleteDeck(targetDeck);
      removeDeckFromList(targetDeck);
    }
  }

  return (
    <div className="card w-50" style={{ width: "18rem" }} key={id}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p>{cards.length} cards</p>
        <p className="card-text">{description}</p>
        <Link to={`/decks/${id}`}>
          <button type="button" className="btn btn-secondary">
            View
          </button>
        </Link>
        <Link to={`/decks/${id}/study`}>
          <button type="button" className="btn btn-primary mx-2">
            Study
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeckDelete}
          value={id}
        >
          Trash
        </button>
      </div>
    </div>
  );
}

export default DeckCard;
