import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(exp => (
    <tr key={exp._id}>
      <td>{exp.school}</td>
      <td className="hide-sm">
        {exp.degree}
      </td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{exp.format}</Moment> -
        {exp.current ? ' Present' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteEducation(exp._id)}>Delete</button>
      </td>
    </tr>
  ))

  return (
    <>
      <h2 className="my-3">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education)
