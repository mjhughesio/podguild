import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFilteredHostProfiles } from "../../actions/profile";

const SearchHostProfiles = ({
  getFilteredHostProfiles,
  profile: { profiles },
}) => {
  const [interest, setInterest] = useState("");

  const onChange = e => {
    setInterest(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    getFilteredHostProfiles(interest.toLowerCase().trim());
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
          Enter the desired topic to filter through the community and locate a
          great host with the same interest in mind.
        </small>
        <input type="submit" value="SEARCH" className="btn btn-dark my-1" />
      </div>
    </form>
  );
};

SearchHostProfiles.propTypes = {
  getFilteredHostProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getFilteredHostProfiles })(
  SearchHostProfiles
);
