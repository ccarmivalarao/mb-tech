import React from 'react'
import Loader from "react-loader-spinner";

const Spinner = () => (
  <div style={{
    width: '100%', display: 'flex', justifyContent: 'center'
  }}>
    <Loader
      type="Circles"
      color="#00BFFF"
      height={100}
      width={100}
    // timeout={3000} //3 secs
    />
  </div >

)

export default Spinner