import React from 'react';
import './results.scss';


export default function Results(props) {
  
    return (
      <section className='results'>
          <h2>Request History</h2>
        {props.data.map(data =>{
         return <>
        <div>Request Method: {data.requestData.method}</div>
        <div>URL: {data.requestData.url}</div>
        <pre>{data.data ? JSON.stringify(data.data, undefined, 2) : null}</pre>
        </>
        }
        )}
      </section>
    );
  
  }

 