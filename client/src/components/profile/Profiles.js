import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import Spinner from '../spinner/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  if (loading) return <Spinner />
  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>
        Browse and connect with developers
      </p>
      <div className="profiles">
        {
          profiles.length > 0 ?
            profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />) :
            (<h4>No profile found</h4>)
        }
      </div>
    </>
  )
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
