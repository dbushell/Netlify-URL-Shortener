import React, {memo} from 'react';

const Aside = memo(props => {
  return (
    <aside>
      <p>
        A progressive web app to unshorten URLs. Proof-of-concept built with
        React, Node, and Netlify functions.
      </p>
      <p><a href="https://dbushell.com/2020/01/27/building-a-pwa-with-netlify-functions/">About Eavesdrop</a></p>
    </aside>
  );
});

export default Aside;
