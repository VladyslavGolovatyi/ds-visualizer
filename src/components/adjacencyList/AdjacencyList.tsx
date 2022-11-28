import './adjacencyList.css'

import React, { useState } from 'react'

import { useDataStore } from '../../store/context'
import {NodeFrame} from './NodeFrame'

const AdjacencyList: React.FunctionComponent = () => {
  const store = useDataStore()
  const { graph, addNode } = store
  const [autoIncId, setAutoIncId] = useState(1)
  const [someState, setSomeState] = useState(1)
  const nodesList = graph
    .nodes()
    .sort((ele1, ele2) => ele1.data('id') - ele2.data('id'))
    .map((node) => (
      <NodeFrame
        key={node.data('id')}
        node={node.data('id')}
        parentState={someState}
        changeParentState={setSomeState}
      />
    ))

  return (
    <div className="adjacencyList">
      <div className="adjacencyListTitle">Directed unweighted graph: Adjacency List</div>
      <ul className="nodeList">{nodesList}</ul>
      <button
        className="addNodeButton"
        onClick={() => {
          addNode(autoIncId.toString())
          setAutoIncId(autoIncId + 1)
        }}
      >
        Add Node
      </button>
    </div>
  )
}

export {AdjacencyList}
