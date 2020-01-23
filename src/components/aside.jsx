import React, {memo} from 'react';

const Aside = memo(props => {
  return (
    <aside>
      <p>
        Eavesdrop – a progressive web app to unshorten URLs. Built with React,
        Node, and Netlify.
      </p>
    </aside>
  );
});

export default Aside;
