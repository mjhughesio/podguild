import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    title,
    company,
    location,
    interests,
  },
}) => {
  const capitalize = {
    textTransform: "capitalize",
  };

  return (
    <div className="profile bg-light">
      <img src={avatar} alt="User avatar" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {title} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {interests.slice(0, 4).map((interest, index) => (
          <li key={index} className="text-primary">
            <FontAwesomeIcon icon={faCheck} />{" "}
            <span style={capitalize}>{interest}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
