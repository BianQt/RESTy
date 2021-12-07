import React, { useState, useEffect } from "react";
import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

export default function App(props) {
  const [data, setData] = useState(null);
  const [method, setMethod] = useState("");
  const [raw, setRaw] = useState({});
  const [url, setUrl] = useState("");
  const [state, setState] = useState(false);
  

  function callApi(params, raw) {
    setMethod(params.method);
    setUrl(params.url);
    setRaw(raw);
  }

  useEffect(async () => {
    const requestOptions = {
      method: method,
      body: raw,
    };
    let results;
    if(url){
    setData(null);
    setState(true);
    method==='GET' ?
    results = await fetch(url) : results = await fetch(url, requestOptions)
    const dataParsed = await results.json();
    setData(dataParsed);
    setState(false);
    }
  }, [method,url]);

  return (
    <React.Fragment>
      <Header />
      <Form handleApiCall={callApi} />
      <Results
        data={data}
        method={method}
        url={url}
        state={state}
      />
      <Footer />
    </React.Fragment>
  );
}
