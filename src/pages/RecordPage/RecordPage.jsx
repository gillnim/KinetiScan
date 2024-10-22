import React from 'react'
import Camera from '../../components/Camera/Camera.jsx'
import PoseTracker from '../../components/PoseTracker/PoseTracker.jsx'
import CameraTest from '../../components/CameraTest/CameraTest.jsx'
import PoseTrackerImageTest from '../../components/PoseTrackerImage/PoseTrackerImageTest.jsx'

function RecordPage() {
  return (
    <div>
      <CameraTest /> 
      <PoseTrackerImageTest/>
    </div>
  )
}

export default RecordPage