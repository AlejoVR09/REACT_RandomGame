// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './randomNumber.css';
//import PutOnButton from '../putOnButton/PutOnButton';

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [buttonGenerateDisabled, setButtonGenerateDisabled] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState([true, true, true, true, true]);
  const [buttonsValues, setButtonsValues] = useState(['', '', '', '', '']);
  const [assingedNumber, setAssingedNumber] = useState([null, null, null, null, null]);
  const [showResetButtons, setShowResetButtons] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    if (
      assingedNumber.every(num => num !== null) &&
      JSON.stringify(assingedNumber) === JSON.stringify([...assingedNumber].sort((a, b) => a - b))
    ) {
      setGameResult('¡Ganaste!');
    } else {
      setGameResult(null);
    }
  }, [assingedNumber]);

  const generarrandomNumber = () => {
    const nuevoNumero = Math.floor(Math.random() * 100) + 1;
    setButtonGenerateDisabled(true);
    setRandomNumber(nuevoNumero);


    const nuevosbuttonsDisabled = buttonsValues.map(valor => valor !== '' ? true : false);
    setButtonsDisabled(nuevosbuttonsDisabled);
    setShowResetButtons(false);
    setGameResult(null);
  };

  const handleButtonClick = (index) => {
    const nuevosValores = [...buttonsValues];
    nuevosValores[index] = randomNumber || '';
    setButtonsValues(nuevosValores);
    setButtonGenerateDisabled(false)

    setButtonsDisabled([true, true, true, true, true]);

    setAssingedNumber(prevassingedNumber => {
      const nuevosNumeros = [...prevassingedNumber];
      nuevosNumeros[index] = randomNumber;
      return nuevosNumeros;
    });

    setRandomNumber(null);

    if (!nuevosValores.includes('') && assingedNumber.length === 5) {
      setShowResetButtons(true);
      setButtonGenerateDisabled(true)
    }
  };

  const handleReset = () => {
    setRandomNumber(null);
    setButtonGenerateDisabled(false);
    setButtonsDisabled([true, true, true, true, true]);
    setButtonsValues(['', '', '', '', '']);
    setAssingedNumber([null, null, null, null, null]);
    setShowResetButtons(false);
    setGameResult(null);
  };

  return (
    <div>
      <button className='generator buttons' onClick={generarrandomNumber} disabled={buttonGenerateDisabled}>
        Generate Random Number
      </button>
      <input className='generator-input inputs' type="text" value={randomNumber || ''} readOnly />
      <div className="buttons-container">
        {[1, 2, 3, 4, 5].map((numero, index) => (
          <div key={index}>
          <button
            className='randombuttons buttons'
            onClick={() => handleButtonClick(index)}
            disabled={buttonsDisabled[index]}
          >
            Number {numero}
          </button>
          <input className='randombuttons-input inputs' type="text" value={buttonsValues[index] || ''} readOnly />
        </div>
        ))}
      </div>
      {showResetButtons && <button className='resetbutton buttons' onClick={handleReset}>Reset</button>}
      {gameResult && <div>{gameResult}</div>}
    </div>
  );
};

export default RandomNumber;