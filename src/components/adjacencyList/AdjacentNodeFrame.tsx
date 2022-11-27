import './adjacentNodeFrame.css'

import React from 'react'

const AdjacentNodeFrame: React.FunctionComponent<{ node: string }> = ({ node }) => {
  return (
    <div className="itemFrame">
      <h2 className="itemTitle">{node}</h2>
    </div>
  )
}

export {AdjacentNodeFrame}
