import './controlPanel.css'
import './popup.css'

import React from 'react'

import {useDataStore} from '../../store/context'
import close from './close.png'
import cytoscape from "cytoscape";

const ControlPanel: React.FunctionComponent = () => {
    const store = useDataStore()
    const {bfs, clearGraphAlgs} = store
    let path: cytoscape.CollectionArgument
    let isStopped = false
    let startNode: HTMLInputElement | null
    let i = 0

    function popupToggle() {
        const popup = document.getElementById('popup')
        // @ts-ignore
        popup.classList.toggle('active')
    }

    function visualize() {
        isStopped = false
        startNode = document.getElementById(`startNode`) as HTMLInputElement | null
        if (startNode !== null) {
            path = bfs(startNode.value).path
            const highlightNextEle = function () {
                if (i < path.length && !isStopped) {
                    path[i].addClass('highlighted')
                    setTimeout(highlightNextEle, 1000)
                    i += 1
                    for (let j = 0; j < i - 1; j++) {
                        path[j].addClass('black')
                    }
                }
            }
            highlightNextEle()
        }
    }

    function stepBack() {
        startNode = document.getElementById(`startNode`) as HTMLInputElement | null
        if (startNode !== null && startNode.value !== '') {
            path = bfs(startNode.value).path
            const unmarkLastElement = function () {
                if (i > 0) {
                    path[i - 1].addClass('highlighted')
                    path[i - 1].removeClass('black')
                }
                if (i >= 0) {
                    path[i].removeClass('highlighted black')
                }
            }
            unmarkLastElement()
        }
    }

    return (
        <div className="container">
            <div id="popup">
                <div className="content">
                    <h2>Choose start node</h2>
                    <div className="inputBox">
                        <input type="text" placeholder="Start node" id="startNode"/>
                    </div>
                    <div className="inputBox">
                        <button
                            className="btn"
                            onClick={() => {
                                i = 0
                                visualize()
                                popupToggle()
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
                <a className="close" onClick={popupToggle}>
                    <img src={close} alt="close"/>
                </a>
            </div>
            <button className="controlButton" onClick={popupToggle}>
                Visualize
            </button>
            <button className="controlButton" onClick={() => visualize()}>Continue
            </button>
            <button className="controlButton" onClick={() => isStopped = true}>Stop</button>
            <button className="controlButton" onClick={() => {
                if (i > 0) {
                    i -= 1
                }
                stepBack()
            }}>Back
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
