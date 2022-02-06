import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import DeckCard from "./DeckCard";

function Decks() {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const response = listDecks(abortController.signal);
        const decksFromAPI = await response;
        // console.log(decksFromAPI);

        setDeckList(decksFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();

    return () => {
      // console.log("cleanup");
      abortController.abort(); // Cancels any pending request or response
    };
  }, []);

  function removeDeckFromList(targetDeckId) {
    setDeckList(deckList.filter((deck) => deck.id != targetDeckId));
  }

  return (
    <>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary mb-2">
          Create Deck
        </button>
      </Link>
      {deckList.map((deck) => DeckCard(deck, removeDeckFromList))}
    </>
  );
}

export default Decks;
