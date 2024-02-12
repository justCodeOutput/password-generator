import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [number, isNumberAllowed] = useState(false);
  const [character, isCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [copy, setCopy] = useState('copy')

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "@#$^&*=+-_";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    setCopy('copied')
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <>
      <div className="max-w-md bg-gray-700 py-4 mx-auto rounded-lg my-4">
      <h1 className="text-white text-4xl font-bold text-center py-2 my-4">
          Password Generator
      </h1>
        <div className="text-white py-2 mx-auto text-center rounded-lg">
          <input
            type="text"
            className="py-2 px-2 text-orange-600"
            placeholder="Password"
            value={password}
            ref={passwordRef}
          />
          <button className="my-2 px-1 py-2 bg-blue-600" onClick={copyPassToClipboard}>{copy}</button>
        </div>
        <div className="mx-2 py-4 text-orange-400">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="mx-2"> Length : {length}</label>
          <input
            type="checkbox"
            defaultChecked={isNumberAllowed}
            id="numInput"
            onChange={() => {
              isNumberAllowed(prev => !prev);
            }}
          />
          <label htmlFor="numInput" className="mx-2">Numbers</label>
          <input
            type="checkbox"
            id="charInput"
            defaultChecked={isCharAllowed}
            onChange={() => {
              isCharAllowed(prev => !prev);
            }}
          />
          <label htmlFor="charInput" className="mx-2">Characters</label>
        </div>
      </div>
    </>
  );
};

export default App;
