import React from 'react';

import { ReactComponent as Logo } from 'interface/images/logo.svg';

// This has an elevator music easter egg that occurs randomly once every 10 times.
// Lazy load it to minimize bundle impact. This whole joke has a tiny amount of overhead.
let elevator;
async function loadElevator() {
  elevator = (await import('./elevate')).default;
}
let useElevator = Math.random() < 0.1;

function scrollToTop() {
  if (!useElevator || !elevator) {
    window.scrollTo(0, 0);
  } else {
    elevator();
    // Only do it once to increase ~~confusion~~ mystery
    useElevator = false;
  }
}

const ScrollToTop = () => (
  <div className="clickable" onClick={scrollToTop} onMouseEnter={useElevator && loadElevator}>
    <Logo
      style={{ '--arrow': '#fab700', '--main': '#1c1c1b' }}
    />
  </div>
);

export default ScrollToTop;