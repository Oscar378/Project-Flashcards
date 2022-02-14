import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import NavBar from "./NavBar";
import CardForm from "./CardForm";
import { useParams } from "react-router-dom";

function EditCard() {
  const [currentDeck, setCurrentDeck] = useState({ name: "...", cards: [] });
  const [currentCard, setCurrentCard] = useState({ front: "", back: "" });
  const params = useParams();

  const deckId = params.deckId; //
  useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentDeck() {
      try {
        const response = readDeck(deckId, abortController.signal);
        const deckFromAPI = await response;
        // console.log("Deck from API", deckFromAPI);
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

  const cardId = params.cardId; //
  useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentCard() {
      try {
        const response = readCard(cardId, abortController.signal);
        const cardFromAPI = await response;
        // console.log("Card from API", cardFromAPI);
        setCurrentCard(cardFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getCurrentCard();

    return () => abortController.abort();
  }, [cardId]);

  return (
    <>
      <NavBar
        deckName={currentDeck.name}
        deckId={currentDeck.id}
        cardId={params.cardId}
      />
      <h4 className="py-3">Edit Card {params.cardId}</h4>
      {currentCard.front !== "" ? (
        <CardForm
          deckId={currentDeck.id}
          saveCard={updateCard}
          currentCard={currentCard}
        />
      ) : null}
    </>
  );
}

export default EditCard;
