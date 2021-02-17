import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileById } from '../../actions/profile'
import Spinner from '../spinner/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({ auth, profile: { profile, loading }, match, getProfileById }) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])
  console.log('profile xp', profile)
  if (loading || profile === null) return <Spinner />
  return (
    <>
      <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
      {
        auth.isAuthenticated && auth.loading === false && match.params.id === auth.user._id
        && <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
      }
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {
            profile.experience.length > 0 ?
              profile.experience.map(exp => <ProfileExperience key={exp._id} experience={exp} />) :
              (<h4>No experience credentials associated with the account</h4>)
          }
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {
            profile.education.length > 0 ?
              profile.education.map(edu => <ProfileEducation key={edu._id} education={edu} />) :
              (<h4>No education credentials associated with the account</h4>)
          }
        </div>
        {
          profile.githubusername && <ProfileGithub username={profile.githubusername} />
        }
      </div>
    </>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(Profile)
