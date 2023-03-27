import React, {useRef} from 'react';

const Form = props => {
  const input = useRef(null);
  const classes = [];
  if (props.isDone) {
    classes.push('u-done');
  }
  if (props.isError) {
    classes.push('u-error');
  }
  if (props.isWaiting) {
    classes.push('u-waiting');
  }
  const onClick = () => {
    input.current.focus();
    input.current.select();
  };
  return (
    <form
      className={classes.join(' ')}
      onSubmit={props.onSubmit}
      autocomplete="off">
      <fieldset disabled={props.isWaiting}>
        <label class="u-vh" for="url">
          Short URL
        </label>
        <input
          ref={input}
          required
          id="url"
          type="url"
          name="url"
          placeholder="https://"
          value={props.url}
          onClick={onClick}
          onChange={props.onChange}
        />
        <button class="u-vh" type="submit">
          Go!
        </button>
      </fieldset>
    </form>
  );
};

export default Form;
