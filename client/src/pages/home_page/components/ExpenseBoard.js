import React, { Component } from "react";
import "./ExpenseBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewExpenseModal from "./NewExpenseModal";
import Popup from "reactjs-popup";
import { NavLink } from "react-router-dom";
import BarGraphs from "./BarGraphs.js";
import NewExpenseEntry from "./NewExpenseEntry.js";

const makeCardStack = (cards, update) => {
  const allCards = cards.map(card => {
    switch (card["board_type"]) {
      case "expense":
        return (
          <div className="card my-2 mx-1">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <NavLink to={`/expense/${card["id"]}`}>
                    <FontAwesomeIcon icon="home" className="icons pb-2" />
                    <h5 className="card-title">{card["name"]}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      budgeted: ${card["goal"]}
                    </h6>
                  </NavLink>
                </div>
                <div className="col-md-8 my-auto">
                  <BarGraphs card={card} />
                </div>
                <div className="col-md-2 my-auto">
                  <Popup
                    trigger={
                      <button
                        type="button"
                        className="btn btn-outline-danger quick-entry-btn"
                      >
                        Add Entry
                      </button>
                    }
                    modal
                    closeOnDocumentClick
                  >
                    <NewExpenseEntry category={card} update={update} />
                  </Popup>
                </div>
              </div>
            </div>
          </div>
        );
    }
  });
  return allCards;
};

class ExpenseBoard extends Component {
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <div className="expense-board py-4 text-center">
        <div id="expense-card-container">
          {makeCardStack(props.categories, props.update)}
        </div>
        <Popup
          trigger={
            <button type="button" className="btn btn-outline-danger category-btn">
              Add Category
            </button>
          }
          modal
          closeOnDocumentClick
        >
          <NewExpenseModal update={props.update} />
        </Popup>
      </div>
    );
  }
}

export default ExpenseBoard;
