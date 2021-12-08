import React, { useState } from "react";

import "./form.scss";

function Form(props) {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      raw : e.target.data.value
    };
    props.handleApiCall(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span
            id="get"
            onClick={() => {
              setMethod("GET");
            }}
          >
            GET
          </span>
          <span
            id="post"
            onClick={() => {
              setMethod("POST");
            }}
          >
            POST
          </span>
          <span
            id="put"
            onClick={() => {
              setMethod("PUT");
            }}
          >
            PUT
          </span>
          <span
            id="delete"
            onClick={() => {
              setMethod("DELETE");
            }}
          >
            DELETE
          </span>
        </label>
        <textarea name="data" style={{ width: "500px" }}></textarea>
      </form>
    </>
  );
}

export default Form;
