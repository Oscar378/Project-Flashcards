import React from "react";
import DeckForm from "./DeckForm";
import NavBar from "./NavBar";

function AddDeck() {
  return (
    <React.Fragment>
      <NavBar />
      <h1 className="pt-3">Create Deck</h1>
      <DeckForm />
    </React.Fragment>
  );
}

export default AddDeck;
