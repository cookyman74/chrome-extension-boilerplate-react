import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {
  const [winId, setWinId] = useState(0)
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("====")
    console.log(`발신자(${sender}, 메시지: ${request}`)
    setWinId(Number(request))
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Newtab/Newtab.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        윈도우 데이터 {winId}
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export default Newtab;