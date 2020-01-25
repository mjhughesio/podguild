import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFilteredProfiles } from "../../actions/profile";

const SearchProfiles = ({ getFilteredProfiles, profile: { profiles } }) => {
  const [interest, setInterest] = useState("");

  const onChange = e => {
    setInterest(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    getFilteredProfiles(interest.toLowerCase().trim());
    console.log(interest);
  };

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Fantasy Football"
          name="interest"
          value={interest}
          onChange={onChange}
        />
        <small className="form-text">
          Enter the desired topic to be connected to users with similiar
          interests.
        </small>
        <input type="submit" value="SEARCH" className="btn btn-dark my-1" />
      </div>
    </form>
  );
};

SearchProfiles.propTypes = {
  getFilteredProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getFilteredProfiles })(
  SearchProfiles
);
