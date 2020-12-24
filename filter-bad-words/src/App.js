import './App.css';
import React, {useState} from 'react'
import {badWords} from './badWords'

function App() {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const censorWord = (str) => {
    const len = str.length;
    return str[0] + '*'.repeat(len - 1)
  }

  const determineBadWord = () => {
    const inputArr = input.split(' ')
    let newWord = 'hello'

    for (let i = 0; i < inputArr.length; i++) {
      let word = inputArr[i];

      if (!badWords[word.toLowerCase()]) continue;
      else if (badWords[word.toLowerCase()] === true) {
        inputArr[i] = censorWord(word)
      } else if (badWords[word.toLowerCase()].includes(inputArr[i + 1])) {
          inputArr[i] = censorWord(word);
          inputArr[i + 1] = censorWord(inputArr[i + 1])
      } else {
        continue;
      } 
    }

    for (let key in badWords) {
      if (input.includes(key)) {
        let regex = new RegExp(key, 'g')
        newWord = input.replace(regex, censorWord(key))
        setOutput(newWord)
        return;
      }
      console.log('outside conditional',newWord)
    }
    setOutput(inputArr.join(' '))
  }
  

  return (
    <div className="App">
        <input className='input' placeholder='Enter in a sentence' onChange={(e) => {setInput(e.target.value)}}></input>
        <button className='button' onClick={() => determineBadWord()}>Submit</button>
        <span className='output'>{output}</span>
    </div>
  );
}

export default App;
