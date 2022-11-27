import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'
import { v4 as uuidv4 } from 'uuid'

import layoutOptions from './layout'
import defaultStyle from './style'

cytoscape.use(cola)

export function createStore() {
  const store = {
    graph: cytoscape({
      style: defaultStyle,
      layout: { name: 'cola' },
      elements: [],
      zoom: 1,
      maxZoom: 2,
      minZoom: 1,
    }),

    clearGraphAlgs() {
      this.graph.nodes().removeClass('black')
      this.graph.nodes().removeClass('highlighted')
    },

    layout: {} as cytoscape.Layouts,
    createLayout(options: cytoscape.LayoutOptions) {
      this.layout = this.graph.layout(options)
    },
    refreshLayout() {
      this.layout.stop()
      this.layout = this.graph.elements().makeLayout(layoutOptions.cola)
      this.layout.run()
    },

    addNode(id: string) {
      this.graph.add({ data: { id } })
      this.refreshLayout()
    },
    addEdge(source: string, target: string) {
      this.graph.add({ data: { id: uuidv4(), source, target } })
      this.refreshLayout()
    },
    deleteNode(id: string) {
      const nodeToRemove = this.graph.nodes().filter(function (ele) {
        return ele.data('id') === id
      })
      this.graph.remove(nodeToRemove)
      this.refreshLayout()
    },
    deleteEdge(source: string, target: string) {
      const edgeToRemove = this.graph.edges().filter(function (ele) {
        return ele.data('source') === source && ele.data('target') === target
      })
      this.graph.remove(edgeToRemove)
      this.refreshLayout()
    },
    bfs(id: string) {
      const startNode = this.graph.nodes().filter(function (ele) {
        return ele.data('id') === id
      })

      return this.graph.elements().bfs({
        roots: startNode,
        directed: true,
      })
    },
  }

  store.createLayout(layoutOptions.cola)

  store.refreshLayout()

  return store
}

export type TStore = ReturnType<typeof createStore>
