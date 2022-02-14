import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NavBar from "./NavBar";
import DeckForm from "./DeckForm";


function EditDeck() {
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
        //   console.log(deckFromAPI);
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
    <div>
      <NavBar deckName={currentDeck.name} deckId={params.deckId} />
      <h1 className="py-3">Edit Deck</h1>
      {currentDeck.id ? <DeckForm deckInfo={currentDeck}/>: null}
    </div>
  );
}

export default EditDeck;
