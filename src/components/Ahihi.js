import React, { useState, useEffect, useLayoutEffect } from "react";

function Ahihi() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [dmcs, setDmcs] = useState(0);
//   const [dmm, setDmm] = useState(0);

  useEffect(() => {
    setDmcs(count);
  }, [ count]);

  useEffect(() => {
    console.log("dmcs useEffect");
  }, []);

  useLayoutEffect(() => {
    console.log("dmcs useLayoutEffect");
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <h1>{dmcs}</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Ahihi;
