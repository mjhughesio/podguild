import React, { Fragment } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

const Inbox = () => (
  <Fragment>
    <h1 className="large text-primary">Inbox</h1>
    <p className="lead">
      <FontAwesomeIcon icon={faEnvelopeOpen} /> You've Got Mail!
    </p>
  </Fragment>
);

export default connect()(Inbox);
