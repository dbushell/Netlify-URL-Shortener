import React from 'react';

const Form = props => {
  return (
    <form method="get" onSubmit={props.onSubmit} autocomplete="off">
      <fieldset disabled={props.isDisabled}>
        <input
          required
          type="url"
          name="url"
          value={props.url}
          onChange={props.onChange}
        />
        <button type="submit">Go</button>
      </fieldset>
    </form>
  );
};

export default Form;
