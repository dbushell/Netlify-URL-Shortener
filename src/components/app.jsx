import React, {Fragment, useState} from 'react';
import Alert from './alert';
import Aside from './aside';
import Footer from './footer';
import Form from './form';

const App = props => {
  const [url, setURL] = useState('https://bit.ly/37orN4K');
  const [isNew, setNew] = useState(true);
  const [isDone, setDone] = useState(false);
  const [isError, setError] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const onChange = ev => {
    setURL(ev.target.value);
    setNew(true);
    setDone(false);
    setError(false);
  };
  const onSubmit = ev => {
    ev.preventDefault();
    setDone(false);
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
        setDone(true);
        setError(false);
        setURL(data.url);
      })
      .catch(err => {
        console.log(err.message);
        setError(true);
      })
      .finally(() => {
        setWaiting(false);
      });
  };
  return (
    <Fragment>
      <header>
        <h1 data-text="Eavesdrop">Eavesdrop</h1>
      </header>
      <main>
        <Form
          {...{
            isDone,
            isError,
            isWaiting,
            url,
            onChange,
            onSubmit
          }}
        />
        {isError && <Alert message={'Sorry – the unshortening failed…'} />}
      </main>
      <Aside />
      <Footer />
    </Fragment>
  );
};

export default App;
