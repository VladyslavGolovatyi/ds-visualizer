import React, {useEffect, useRef} from 'react'
import './graph.css'

import {useDataStore} from '../../store/context'

const Graph: React.FunctionComponent = () => {
    const container = useRef<HTMLDivElement>(null)
    const store = useDataStore()
    const {graph} = store

    useEffect(() => {
        graph.mount(container.current as HTMLDivElement)
    }, [])

    return <div className="graph" ref={container}/>
}

export {Graph}
