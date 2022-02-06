import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, useHistory, Link } from "react-router-dom";
import NavBar from "./NavBar";

// still need the not enough cards section.
function Study() {
  const [currentDeck, setCurrentDeck] = useState({
    id: 0,
    name: "...",
    cards: [{ font: "Loading..." }],
  });
  const [cardInfo, setCardInfo] = useState({
    index: 0,
    showFront: true,
    cardFlipped: false,
  });
  const params = useParams();
  const history = useHistory();
  const cardList = currentDeck.cards;

  useEffect(() => {
    const abortController = new AbortController();
    const deckId = params.deckId;

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
  }, []);

  function flipClickHandler() {
    setCardInfo({
      ...cardInfo,
      showFront: !cardInfo.showFront,
      cardFlipped: true,
    });
  }

  function nextClickHandler() {
    if (cardInfo.index < cardList.length - 1) {
      setCardInfo({
        ...cardInfo,
        index: cardInfo.index + 1,
        showFront: true,
        cardFlipped: false,
      });
    } else {
      if (window.confirm("Do you want to restart the cards?")) {
        setCardInfo({
          ...cardInfo,
          index: 0,
          showFront: true,
          cardFlipped: false,
        });
      } else {
        history.push("/");
      }
    }
  }

  return (
    <div>
      <NavBar deckName={currentDeck.name} deckId={currentDeck.id} />
      <h1 className="pt-3">Study: {currentDeck.name}</h1>
      {currentDeck.cards.length < 3 ? (
        <>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are{" "}
            {currentDeck.cards.length} cards in this deck.
          </p>
          <Link to={`/decks/${currentDeck.id}/cards/new`}>
            <button type="button" className="btn btn-primary mt-3">
              Add Cards
            </button>
          </Link>
        </>
      ) : (
        <div className="card w-75" style={{ width: "18rem" }}>
          <div className="card-body">
            <h4>
              Card {cardInfo.index + 1} of {cardList.length}
            </h4>
            <p>
              {cardInfo.showFront
                ? cardList[cardInfo.index].front
                : cardList[cardInfo.index].back}
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={flipClickHandler}
            >
              Flip
            </button>

            {cardInfo.cardFlipped ? (
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={nextClickHandler}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Study;
