import React, { FunctionComponent } from "react";
import { css } from "goober";

const App: FunctionComponent = () => {
  const red = css`
    color: red;
  `;
  return (
    <div className="App">
      <header className="App-header">
        <p className={red}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default App;
