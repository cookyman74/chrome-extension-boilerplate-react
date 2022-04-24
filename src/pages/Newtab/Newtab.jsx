import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {
  useEffect(() => {
    chrome.storage.onChanged.addListener(()=>{
      console.log("바뀌었다.")
      chrome.storage.local.get(['id'], (result) => {
        console.log("데이터가져오기 성공:", result)
      })
    })
  }, [])

  // function onGot(tabInfo) {
  //   console.log(tabInfo);
  // }
  
  // function onError(error) {
  //   console.log(`Error: ${error}`);
  // }
  
  // const gettingCurrent = chrome.tabs.getCurrent();
  // gettingCurrent.then(onGot, onError);

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
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export default Newtab;