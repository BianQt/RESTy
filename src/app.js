
import React, { useState } from 'react';
import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

export default function App(props)  {

  const [data, setData] = useState(null);
  const [requestParams, setParams] = useState({});

  function callApi(params,fetchData){
    // mock output
    console.log(fetchData);
    const data = {
      count: fetchData.length,
      results: fetchData,
    };
    setData(data);
    setParams(params);
  }

    return (
      <React.Fragment>
        <Header />
        <Form handleApiCall={callApi} />
        <Results data={data} method={requestParams.method} url={requestParams.url} />
        <Footer />
      </React.Fragment>
    );
  
}

