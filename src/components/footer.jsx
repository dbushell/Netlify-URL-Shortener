import React, {memo} from 'react';

const Footer = memo(props => {
  return (
    <p>
      Copyright © {new Date().getFullYear()}{' '}
      <a href="https://dbushell.com/">David Bushell</a> |
      <a href="https://twitter.com/dbushell">@dbushell</a>
    </p>
  );
});

export default Footer;
