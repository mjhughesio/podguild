import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getGuestProfiles } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import SearchGuestProfiles from "./SearchGuestProfiles";

const Profiles = ({ getGuestProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getGuestProfiles();
  }, [getGuestProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Guests</h1>
          <p className="lead">
            <FontAwesomeIcon icon={faPodcast} /> Browse and connect with our
            collection of podcast guests to arrange an interview
          </p>
          <SearchGuestProfiles />
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getGuestProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getGuestProfiles })(Profiles);
