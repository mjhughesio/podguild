import React, { useState } from "react";
import { connect } from "react-redux";

const MessageForm = () => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Type something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          setText("");
        }}
      >
        <textarea
          cols="30"
          rows="5"
          placeholder="Hey! Let's connect!"
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type="submit" value="Send" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

export default connect()(MessageForm);
