import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({ experience: { company, from, to, current, title, description } }) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment>
       -
      {current ? 'Present' : <Moment format="YYYY/MM/DD">{to}</Moment>}</p>
    <p><strong>Position: </strong>{title}</p>
    <p>
      <strong>Description: </strong>{description}
    </p>
  </div>
)

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
}

export default ProfileExperience
