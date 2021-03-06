import React from 'react';
import './results.scss';
function Results(props) {
  
    return (
      <section className='results'>
        {props.state === true ?
        <div class="loader"></div> :
        <>
        <div>Request Method: {props.method}</div>
        <div>URL: {props.url}</div>
        <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
        </>}
      </section>
    );
  }


export default Results;
