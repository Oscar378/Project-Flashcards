import React, { useEffect, useState } from "react";
import { readDeck, createCard } from "../utils/api/index";
import NavBar from "./NavBar";
import CardForm from "./CardForm";
import { useParams } from "react-router-dom";

function AddCard() {
  const [currentDeck, setCurrentDeck] = useState({ name: "...", cards: [] });
  const params = useParams();

  const deckId = params.deckId; //
  useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentDeck() {
      try {
        const response = readDeck(deckId, abortController.signal);
        const deckFromAPI = await response;
        console.log("Deck from API", deckFromAPI);
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

  return (
    <React.Fragment>
      <NavBar deckName={currentDeck.name} deckId={currentDeck.id} />
      <h4 className="py-3">{currentDeck.name}: </h4>
      <h4>Add Card</h4>
      <CardForm deckId={currentDeck.id} saveCard={createCard} />
    </React.Fragment>
  );
}

export default AddCard;
