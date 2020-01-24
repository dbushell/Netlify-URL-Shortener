import React, {memo} from 'react';

const Aside = memo(props => {
  return (
    <aside>
      <p>
        A progressive web app to unshorten URLs. Proof-of-concept built with
        React, Node, and Netlify functions.
      </p>
    </aside>
  );
});

export default Aside;
