import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'
import dagre from 'cytoscape-dagre';
import {insertNode, deleteNode, findNode, Node} from '../avlTree/avlTree'

import {v4 as uuidv4} from 'uuid'

import {colaLayout, dagreLayout} from './layout'
import defaultStyle from './style'
import {delay} from "lodash";

cytoscape.use(cola)
cytoscape.use(dagre)

export function createStore() {
    let isTree = false
    const store = {
        graph: cytoscape({
            style: defaultStyle,
            layout: {name: 'cola'},
            elements: [],
            zoom: 1,
            maxZoom: 2,
            minZoom: 1,
        }),

        clearGraphAlgs() {
            this.graph.nodes().removeClass('black')
            this.graph.nodes().removeClass('highlighted')
            this.graph.nodes().removeClass('founded')
        },

        layout: {} as cytoscape.Layouts,
        createLayout(options: cytoscape.LayoutOptions) {
            this.layout = this.graph.layout(options)
        },
        refreshLayout() {
            this.layout.stop()
            this.layout = this.graph.elements().makeLayout(isTree ? dagreLayout : colaLayout)
            this.layout.run()
        },

        addNode(id: string) {
            isTree = false
            this.graph.add({data: {id}})
            this.refreshLayout()
        },
        async addNodeToTree(id: string) {
            isTree = true
            if (this.graph.nodes().filter(function (ele) {
                return ele.data('id') === id
            }).size() === 0) {
                this.graph.add({data: {id}})
                let edgesArr = insertNode(id)
                for (const edges of edgesArr) {
                    this.graph.edges().remove()
                    for (const edge of edges) {
                        this.graph.add(edge)
                    }
                    this.refreshLayout()
                    await new Promise(f => setTimeout(f, 1000));
                }
                this.refreshLayout()
            }
        },
        addEdge(source: string, target: string) {
            if(this.graph.nodes().filter(function (ele) {
                return ele.data('id') === target
            }).size() === 0) return
            this.graph.add({data: {id: uuidv4(), source, target}})
            this.refreshLayout()
        },
        deleteNode(id: string) {
            const nodeToRemove = this.graph.nodes().filter(function (ele) {
                return ele.data('id') === id
            })
            this.graph.remove(nodeToRemove)
            this.refreshLayout()
        },
        async deleteNodeFromTree(id: string) {
            const nodeToRemove = this.graph.nodes().filter(function (ele) {
                return ele.data('id') === id
            })
            let edgesArr = deleteNode(id)
            for (const edges of edgesArr) {
                this.graph.edges().remove()
                for (const edge of edges) {
                    this.graph.add(edge)
                }
                this.refreshLayout()
                await new Promise(f => setTimeout(f, 1000));
            }
            this.graph.remove(nodeToRemove)
            console.log(this.graph.edges())
            console.log(this.graph.nodes())
        },
        findNodeInTree(target: string) {
            let path = findNode(target)
            console.log(path)
            for (let i = 0; i < path.length; ++i) {
                let currentNode = this.graph.elements().getElementById(path[i])
                currentNode.addClass('highlighted')
                if(path[i] == target) {
                    currentNode.addClass('founded')
                }
            }
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

    store.createLayout(isTree ? dagreLayout : colaLayout)

    store.refreshLayout()

    return store
}

export type TStore = ReturnType<typeof createStore>
