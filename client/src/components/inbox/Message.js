import React, { Fragment } from "react";
import { connect } from "react-redux";
import MessageForm from "./MessageForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Message = () => (
  <Fragment>
    <h1 className="large text-primary">New Message</h1>
    <p className="lead">
      <FontAwesomeIcon icon={faPaperPlane} /> Say hello to (username)!
    </p>
    <MessageForm />
  </Fragment>
);

export default connect()(Message);
