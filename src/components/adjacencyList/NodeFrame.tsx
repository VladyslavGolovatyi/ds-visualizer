import './nodeFrame.css'

import React, { useState } from 'react'

import { useDataStore } from '../../store/context'
import {AdjacentNodeFrame} from './AdjacentNodeFrame'

const NodeFrame: React.FunctionComponent<{ node: string; parentState: number; changeParentState: any }> = ({
  node,
  parentState,
  changeParentState,
}) => {
  const store = useDataStore()
  const { graph, addEdge, deleteEdge, deleteNode } = store
  const id = node
  const adjacentNodes = graph
    .edges()
    .filter(function (ele) {
      return ele.data('source') === id
    })
    .map((edge) => <AdjacentNodeFrame key={edge.data('target')} node={edge.data('target')} />)
  const [autoIncId, setAutoIncId] = useState(1)

  return (
    <div className="itemFrame">
      <div className="numbers">
        <h2 className="itemTitle">{id}</h2>
        <ul className="adjacentNodeList">{adjacentNodes}</ul>
      </div>
      <div className="controlButtons">
        <input type="text" className="inputNode" id={`addEdgeInput${id}`} />
        <button
          className="controlNodeButton"
          onClick={() => {
            const addEdgeInput = document.getElementById(`addEdgeInput${id}`) as HTMLInputElement | null
            if (addEdgeInput !== null) {
              addEdge(id, addEdgeInput.value)
              addEdgeInput.value = ''
              setAutoIncId(autoIncId + 1)
            }
          }}
        >
          Add edge
        </button>
        <input type="text" className="inputNode" id={`deleteEdgeInput${id}`} />
        <button
          className="controlNodeButton"
          onClick={() => {
            const deleteEdgeInput = document.getElementById(`deleteEdgeInput${id}`) as HTMLInputElement | null
            if (deleteEdgeInput !== null) {
              deleteEdge(id, deleteEdgeInput.value)
              deleteEdgeInput.value = ''
              setAutoIncId(autoIncId + 1)
            }
          }}
        >
          Delete edge
        </button>
        <button
          className="controlNodeButton"
          onClick={() => {
            deleteNode(id)
            setAutoIncId(autoIncId + 1)
            changeParentState(parentState + 1)
          }}
        >
          Delete node
        </button>
      </div>
    </div>
  )
}

export {NodeFrame}
