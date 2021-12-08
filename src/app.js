import React, { useState, useEffect, useReducer } from "react";
import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import History from "./components/history";

const ACTIONS = {};

function reducer(state, action) {
  switch (action.type) {
    case "submit":
      return { ...state, requestData: action.payload };
    case "data":
      return { ...state, data: action.payload };
    case "loader":
      return { ...state, loader: action.payload };
    case "history":
      return { ...state, history: action.payload };
      case "show-history":
      return { ...state, showHistory: !state.showHistory, data: null };
  }
}

export default function App(props) {
  const initialState = {
    data: null,
    requestData: {
      method: "GET",
      url: "",
      raw: {},
    },
    loader: false,
    history: [],
    showHistory:false
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(async () => {
    const requestOptions = {
      method: state.requestData.method,
      body: state.requestData.raw,
    };
    let results;
    if (state.requestData.url) {
      dispatch({ type: "data", payload: null });
      dispatch({ type: "loader", payload: true });
      state.requestData.method === "GET"
        ? (results = await fetch(state.requestData.url))
        : (results = await fetch(state.requestData.url, requestOptions));
      const dataParsed = await results.json();
      dispatch({ type: "data", payload: dataParsed });
      dispatch({ type: "loader", payload: false });

      let storedData = JSON.parse(localStorage.getItem("history")) || [];

      localStorage.setItem(
        "history",
        JSON.stringify([{requestData:state.requestData ,data:dataParsed}, ...storedData])
      );
      dispatch({
        type: "history",
        payload: JSON.parse(localStorage.getItem("history")),
      });
    }
  }, [state.requestData.method, state.requestData.url]);

  return (
    <React.Fragment>
      <Header />
      <Form dispatch={dispatch} />
      {state.showHistory ? <History
      data={state.history}
      />:
      <Results
        data={state.data}
        method={state.requestData.method}
        url={state.requestData.url}
        state={state.loader}
      />}
      <Footer />
    </React.Fragment>
  );
}
