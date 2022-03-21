import React from 'react';
import Example from './components/Example/Example';
import Utils from './constants/helpers/Utils';

import './css/adaptive.less';
import './css/main.less';
import './fonts/stylesheet.less';

function App() {
  new Utils();
  return (
    <React.Fragment>
      <div className="box" id="box">
        <Example />
      </div>
    </React.Fragment>
  );
}

export default App;