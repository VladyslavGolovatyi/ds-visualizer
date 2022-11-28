import { useLocalObservable } from 'mobx-react-lite'
import React, {createContext, useContext} from 'react'

import { createStore, TStore } from './store'

const StoreContext = createContext<TStore | null>(null)

export const DataStoreProvider = ({ children }: { children: unknown }): React.ReactElement => {
  const store = useLocalObservable(createStore)

  return <StoreContext.Provider value={store}>{children}. </StoreContext.Provider>
}

export const useDataStore = (): TStore => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }

  return store
}
