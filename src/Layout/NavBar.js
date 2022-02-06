import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

function NavBar({ deckName = "...", deckId = null, cardId = null }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid justify-content-start">
        <ul className="navbar-nav list-group-horizontal">
          <li className="nav-item px-1">
            <span className="nav-link">
              <Link to="/">Home</Link>
            </span>
          </li>
          <li className="nav-item px-1">
            <Switch>
              <Route exact path="/decks/new">
                <span className="nav-link disabled"> / Create Deck</span>
              </Route>
              <Route exact path="/decks/:id">
                <span className="nav-link disabled">
                  {" "}
                  / {deckName}
                </span>
              </Route>
              <Route
                path={[
                  "/decks/:id/cards/new",
                  "/decks/:deckId/cards/:cardId/edit",
                  "/decks/:deckId/edit",
                  "/decks/:deckId/study"
                ]}
              >
                <span className="nav-link">
                  /{" "}
                  <Link to={`/decks/${deckId}`}>
                    {deckName}
                  </Link>
                </span>
              </Route>
            </Switch>
          </li>
          <li className="nav-item px-1">
            <Switch>
              <Route path="/decks/:id/cards/new">
                <span className="nav-link disabled"> / Add Card</span>
              </Route>
              <Route path="/decks/:deckId/cards/:cardId/edit">
                <span className="nav-link disabled"> / Edit Card {cardId}</span>
              </Route>
              <Route path="/decks/:deckId/edit">
                <span className="nav-link disabled"> / Edit Deck</span>
              </Route>
              <Route path="/decks/:deckId/study">
                <span className="nav-link disabled"> / Study</span>
              </Route>
            </Switch>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
