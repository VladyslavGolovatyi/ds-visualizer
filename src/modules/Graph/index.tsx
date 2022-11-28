import './style.css'

import React from 'react'

import {AdjacencyList} from '../../components/adjacencyList/AdjacencyList'
import {ControlPanel} from '../../components/controlPanel/ControlPanel'
import {Graph} from '../../components/graph/Graph'
import {DataStoreProvider} from '../../store/context'

const GraphModule: React.FunctionComponent = () => {
    return (
        <DataStoreProvider>
            <div>
                <div className="flex-row">
                    <div className="flex-column main-visual">
                        <div className="flex-row fns">
                            <ControlPanel/>
                        </div>
                        <section className="visual">
                            <Graph/>
                        </section>
                    </div>
                </div>
                <AdjacencyList/>
            </div>
        </DataStoreProvider>
    )
}

export {GraphModule}
