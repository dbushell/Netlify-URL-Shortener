import React, {Fragment, useState} from 'react';
import Alert from './alert';
import Footer from './footer';
import Form from './form';

const App = props => {
  const [url, setURL] = useState('');
  const [error, setError] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const onChange = ev => {
    setURL(ev.target.value);
  };
  const onSubmit = ev => {
    ev.preventDefault();
    setError(false);
    setWaiting(true);
    fetch('/.netlify/functions/unshorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url})
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        setError(false);
        setURL(data.url);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setWaiting(false);
      });
  };
  return (
    <Fragment>
      {error && <Alert message={error} />}
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
