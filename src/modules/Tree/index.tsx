import './style.css'

import React from 'react'

import {ControlPanel} from '../../components/controlPanelTree/ControlPanel'
import {Graph} from '../../components/graph/Graph'
import {DataStoreProvider} from '../../store/context'

const TreeModule: React.FunctionComponent = () => {
    return (
        <DataStoreProvider>
            <div>
                <div className="flex-row">
                    <div className="main-visual">
                        <div className="flex-row fns">
                            <ControlPanel/>
                        </div>
                        <section className="visual">
                            <Graph/>
                        </section>
                    </div>
                </div>
            </div>
        </DataStoreProvider>
    )
}

export {TreeModule}
