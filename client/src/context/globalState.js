import React, { useState } from 'react';
import defaults from '../assets/defaults.json';

const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = (props) => {
  const [state, setState] = useState({mode: null, note: defaults.note})

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
