import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar";

function Deck() {
  const [currentDeck, setCurrentDeck] = useState({ name: "...", cards: [] });
  const params = useParams();
  const history = useHistory();

  const deckId = params.deckId;
  useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentDeck() {
      try {
        const response = readDeck(deckId, abortController.signal);
        const deckFromAPI = await response;
        // console.log(deckFromAPI);
        setCurrentDeck(deckFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getCurrentDeck();

    return () => abortController.abort();
  }, [deckId]);

  async function handleDeckDelete(event) {
    const targetDeck = event.target.value;
    if (window.confirm("Do you really want to delete?")) {
      await deleteDeck(targetDeck);
      // optional update here. Make it delete deck in array without needing to refresh the screen.
      history.push("/");
    }
  }

  async function handleCardDelete(event) {
    const targetCard = event.target.value;
    console.log(targetCard);
    if (window.confirm("Do you really want to delete?")) {
      const response = await deleteCard(targetCard);
      // optional update here. Make it delete card in array without needing to refresh the screen.
      history.go(0);
    }
  }

  return (
    <div className="container">
      <NavBar deckName={currentDeck.name} />
      <div>
        <h4>{currentDeck.name}</h4>
        <p>{currentDeck.description}</p>
        <div>
          <Link to={`/decks/${currentDeck.id}/edit`}>
            <button type="button" className="btn btn-secondary">
              Edit
            </button>
          </Link>
          <Link to={`/decks/${currentDeck.id}/study`}>
            <button type="button" className="btn btn-primary m-2">
              Study
            </button>
          </Link>
          <Link to={`/decks/${currentDeck.id}/cards/new`}>
            <button type="button" className="btn btn-primary">
              Add Cards
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger m-2 "
            value={currentDeck.id}
            onClick={handleDeckDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <h3>Cards</h3>
        {currentDeck.cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-body">
              <div className="row">
                <div className="col">{card.front}</div>
                <div className="col">
                  <div className="row">
                    <div className="col-12">{card.back}</div>
                    <div className="col-12">
                      <Link
                        to={`/decks/${currentDeck.id}/cards/${card.id}/edit`}
                      >
                        <button type="button" className="btn btn-secondary m-1">
                          Edit
                        </button>
                      </Link>
                      <button
                        value={card.id}
                        type="button"
                        className="btn btn-danger m-1 "
                        onClick={handleCardDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deck;
