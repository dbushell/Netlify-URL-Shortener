import React, {Fragment, useState} from 'react';
import Footer from './footer';
import Form from './form';

const App = props => {
  const [url, setURL] = useState('');
  const [isWaiting, setWaiting] = useState(false);
  const onChange = ev => {
    setURL(ev.target.value);
  };
  const onSubmit = ev => {
    ev.preventDefault();
    const data = JSON.stringify({
      url
    });
    // https://eavesdrop.app/.netlify/functions/unshorten
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/.netlify/functions/unshorten', true);
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('loadend', response => {
      console.log(response);
      if (response.target.status === 200) {
      } else {
      }
    });
    xhr.send(data);
  };
  return (
    <Fragment>
      <Form
        url={url}
        isDisabled={isWaiting}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <Footer />
    </Fragment>
  );
};

export default App;
