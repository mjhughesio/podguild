import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome, {user && user.name}!
      </p>
      {profile !== null ? (
        <Fragment>
          {" "}
          <DashboardActions />
          <h2 className="my-2">Experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Microsoft</td>
                <td className="hide-sm">Senior Developer</td>
                <td className="hide-sm">Oct 2011 - Current</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Sun Microsystems</td>
                <td className="hide-sm">Senior Developer</td>
                <td className="hide-sm">Oct 2004 - Nov 2010</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className="my-2">Education Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>University of Washington</td>
                <td className="hide-sm">Masters</td>
                <td className="hide-sm">Sep 1993 - June 1999</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="my-2">
            <button className="btn btn-danger">
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet set up a profile. To do so, please click the button
            below.
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
