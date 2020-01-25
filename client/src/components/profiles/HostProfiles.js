import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getHostProfiles } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import SearchHostProfiles from "./SearchHostProfiles";

const Profiles = ({ getHostProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getHostProfiles();
  }, [getHostProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Hosts</h1>
          <p className="lead">
            <FontAwesomeIcon icon={faPodcast} /> Browse and connect with our
            collection of podcast hosts to arrange an interview
          </p>
          <SearchHostProfiles />
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
  getHostProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getHostProfiles })(Profiles);
