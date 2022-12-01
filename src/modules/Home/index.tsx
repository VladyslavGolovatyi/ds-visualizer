import './style.css'

import React from 'react'

const Home: React.FunctionComponent = () => {
  return (
    <>
      <div className="homeMain">
        <div className="homeMain__choice">
          <div className="topic">BFS</div>
          <button className="startButton" onClick={() => (window.location.href = '/graph')}>
            Start
          </button>
        </div>
        <div className="homeMain__choice">
          <div className="topic">AVL tree</div>
          <button className="startButton" onClick={() => (window.location.href = '/tree')}>
            Start
          </button>
        </div>
      </div>
      <div className="footer">Internet of things 2022</div>
    </>
  )
}

export {Home}
