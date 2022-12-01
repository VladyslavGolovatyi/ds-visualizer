import cytoscape from 'cytoscape'

const COLORS = {
  blue: '#041ba9',
  green: '#00FF00',
  yellow: '#d1e70f',
  black: '#010c08',
}

const nodeStyles: cytoscape.Stylesheet[] = [
  {
    selector: 'node',
    style: {
      content: 'data(id)',
      'transition-property': 'background-color border-color',
      'transition-duration': 0.3,
      'transition-timing-function': 'ease-in-sine',
      'background-color': COLORS.blue,
    },
  },
  {
    selector: '.highlighted',
    style: {
      'background-color': COLORS.green,
      'line-color': COLORS.green,
      'target-arrow-color': COLORS.green,
      'transition-property': 'background-color, line-color, target-arrow-color',
      'transition-duration': 0.5,
    },
  },
  {
    selector: '.founded',
    style: {
      'background-color': COLORS.yellow,
      'line-color': COLORS.yellow,
      'target-arrow-color': COLORS.yellow,
      'transition-property': 'background-color, line-color, target-arrow-color',
      'transition-duration': 0.5,
    },
  },
  {
    selector: '.black',
    style: {
      'background-color': COLORS.black,
      'line-color': COLORS.black,
      'target-arrow-color': COLORS.black,
      'transition-property': 'background-color, line-color, target-arrow-color',
      'transition-duration': 0.5,
    },
  },
]

const edgeStyles = [
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': COLORS.blue,
      'line-color': COLORS.blue,
    },
  },
]

export default [...nodeStyles, ...edgeStyles] as cytoscape.Stylesheet[]
