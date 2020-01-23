import React from 'react';

const Form = props => {
  return (
    <form onSubmit={props.onSubmit} autocomplete="off">
      <fieldset disabled={props.isDisabled}>
        <label class="u-vh" for="url">Short URL</label>
        <input
          required
          id="url"
          type="url"
          name="url"
          placeholder="https://"
          value={props.url}
          onChange={props.onChange}
        />
        <button class="u-vh" type="submit">Go!</button>
      </fieldset>
    </form>
  );
};

export default Form;
