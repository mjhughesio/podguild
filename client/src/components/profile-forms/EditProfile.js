import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    podrole: "",
    status: "",
    company: "",
    title: "",
    email: "",
    website: "",
    location: "",
    interests: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      podrole: loading || !profile.podrole ? "" : profile.podrole,
      status: loading || !profile.status ? "" : profile.status,
      company: loading || !profile.company ? "" : profile.company,
      title: loading || !profile.title ? "" : profile.title,
      email: loading || !profile.email ? "" : profile.email,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      interests:
        loading || !profile.interests ? "" : profile.interests.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  const {
    podrole,
    status,
    company,
    title,
    email,
    website,
    location,
    interests,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Let's get some information to make
        your profile stand out
      </p>
      <small>* = required fields</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="podrole" value={podrole} onChange={e => onChange(e)}>
            <option value="0">* Select Podcast Role</option>
            <option value="Host">Host</option>
            <option value="Guest">Guest</option>
          </select>
          <small className="form-text">
            Let us know if you are registering as a host or guest.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Specialized Topics"
            name="interests"
            value={interests.toLowerCase()}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values to specify areas of interests for
            podcasting (e.g. Sports, Travel, Politics, Food, Coding)
          </small>
        </div>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Career Industry</option>
            <option value="Business">Business & Finance</option>
            <option value="Computers">Computers & Technology</option>
            <option value="Construction">
              Contracting & Construction Trades
            </option>
            <option value="Education">Education, Teaching & Training</option>
            <option value="Engineering">Engineering</option>
            <option value="Farming">Farming, Fishing & Forestry</option>
            <option value="Health">Health & Medical</option>
            <option value="Hospitality">Hospitality, Travel & Tourism</option>
            <option value="Legal">
              Legal, Law Enforcement & Criminal Justice
            </option>
            <option value="Maintenance">
              Maintenance, Repair & Installation
            </option>
            <option value="Media">Media Communications & Broadcasting</option>
            <option value="Military">Military & Armed Forces</option>
            <option value="Office">Office Administration & Management</option>
            <option value="Production">Production & Manufacturing</option>
            <option value="Professional">Professional Services</option>
            <option value="Psychology">Psychology & Counseling</option>
            <option value="Sales">Sales & Marketing</option>
            <option value="Science">Social & Life Sciences</option>
            <option value="Student">Student</option>
            <option value="Transportation">Transportation & Moving</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Let us know of your career industry or profession.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Professional Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            Let us know the preferred title of your current role.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Your own company or the company of your employer.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            The best email address on which to contact you.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Your own website or the website of your employer.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City, State & Country (e.g. Portland, OR, USA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            If you have a Github profile and would like to display your latest
            repos, please include your username.
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a bit about yourself.</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Media Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <FontAwesomeIcon icon={faTwitter} className="fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon
                icon={faFacebook}
                className="fa-facebook fa-2x"
              />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon icon={faYoutube} className="fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="fa-linkedin fa-2x"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <FontAwesomeIcon
                icon={faInstagram}
                className="fa-instagram fa-2x"
              />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
