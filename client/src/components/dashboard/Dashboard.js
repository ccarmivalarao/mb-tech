import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner';
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({ auth: { user }, profile: { loading, profile }, getCurrentProfile, deleteAccount }) => {

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading && profile === null)
    return <Spinner />
  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user"></i>
        Welcome {user && user.name}
      </p>
      {profile !== null ?
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <button className="btn btn-danger" onClick={() => deleteAccount()}><i className="fas fa-user-minus"></i>{' '} Delete My Account</button>
        </> :
        <>
          <p>Your profile hasn't been setup. Please add some info.</p>
          <Link className='btn btn-primary my-3' to='/create-profile'>Create Profile</Link>
        </>}
    </>
  )

}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
