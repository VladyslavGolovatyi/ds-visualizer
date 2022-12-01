import './controlPanel.css'

import React from 'react'

import {useDataStore} from '../../store/context'
import close from './close.png'
import cytoscape from "cytoscape";

const ControlPanel: React.FunctionComponent = () => {
    const store = useDataStore()
    const {graph, addNodeToTree, deleteNodeFromTree, findNodeInTree, clearGraphAlgs} = store

    return (
        <div className="container">
            <input id="addNode" className="inputNode"/>
            <button className="controlButton" onClick={() => {
                const addNodeInput = document.getElementById(`addNode`) as HTMLInputElement | null
                if (addNodeInput !== null) {
                    addNodeToTree(addNodeInput.value)
                    addNodeInput.value = ''
                }
            }}>Add
            </button>
            <input id="deleteNode" className="inputNode"/>
            <button className="controlButton" onClick={() => {
                const deleteNodeInput = document.getElementById(`deleteNode`) as HTMLInputElement | null
                if (deleteNodeInput !== null) {
                    deleteNodeFromTree(deleteNodeInput.value)
                    deleteNodeInput.value = ''
                }
            }}>Delete
            </button>
            <input id="findNode" className="inputNode"/>
            <button className="controlButton" onClick={() => {
                const findNodeInput = document.getElementById(`findNode`) as HTMLInputElement | null
                if (findNodeInput !== null) {
                    findNodeInTree(findNodeInput.value)
                    findNodeInput.value = ''
                }
            }}>Find
            </button>
            <button className="controlButton" onClick={clearGraphAlgs}>Clear</button>
            <button
                className="controlButton"
                onClick={() => {
                    window.location.href = '/'
                }}
            >
                Home
            </button>
        </div>
    )
}

export {ControlPanel}
