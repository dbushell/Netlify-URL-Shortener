import React, {memo} from 'react';

const Footer = memo(props => {
  return (
    <footer>
      <p>
        <a href="https://github.com/dbushell/eavesdrop.netlify.app">MIT licensed</a>{' '}
        &ndash; Copyright © {new Date().getFullYear()}{' '}
        <a href="https://dbushell.com/">David Bushell</a> &ndash;
        <a href="https://twitter.com/dbushell">@dbushell</a>
      </p>
    </footer>
  );
});

export default Footer;
