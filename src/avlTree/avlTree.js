import {v4 as uuidv4} from 'uuid'

export class Node {
    constructor(d) {
        this.left = null;
        this.right = null;
        this.key = parseInt(d);
        this.height = 1;
    }
}

let root = null;

function height(N) {
    if (N === null) {
        return 0;
    }

    return N.height;
}

function rightRotate(y) {
    console.log("right rotate")
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    return x;
}

function leftRotate(x) {
    console.log("left rotate")
    let y = x.right;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(height(x.left), height(x.right)) + 1;
    y.height = Math.max(height(y.left), height(y.right)) + 1;
    return y;
}

function getBalanceFactor(N) {
    if (N == null) {
        return 0;
    }

    return height(N.left) - height(N.right);
}


function insertNodeHelper(root, key) {
    let edges = [[]]
    let i = 0
    const callbackFunc = () => {
        addEdgesToChildren(root, edges, i)
        ++i
    }

    if (root === null) {
        return [(new Node(key)), edges];
    }

    if (key < root.key) {
        root.left = insertNodeHelperRec(root.left, key, callbackFunc)[0];
        addEdgesToChildren(root, edges, i)
    } else if (key > root.key) {
        root.right = insertNodeHelperRec(root.right, key, callbackFunc)[0];
        addEdgesToChildren(root, edges, i)
    } else {
        return [root, edges];
    }

    root.height = 1 + Math.max(height(root.left), height(root.right));
    let balanceFactor = getBalanceFactor(root);

    if (balanceFactor > 1) {
        if (key < root.left.key) {
            let result = [rightRotate(root), edges];
            ++i;
            addEdgesToChildren(result[0], edges, i)
            return result
        } else if (key > root.left.key) {
            root.left = leftRotate(root.left);
            ++i
            addEdgesToChildren(root, edges, i)
            let result = [rightRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }

    if (balanceFactor < -1) {
        if (key > root.right.key) {
            let result = [leftRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        } else if (key < root.right.key) {
            root.right = rightRotate(root.right);
            ++i
            addEdgesToChildren(root, edges, i)
            let result = [leftRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }

    return [root, edges];
}

function insertNodeHelperRec(node, key, callback) {
    let edges = [[]]
    let i = 0

    if (node === null) {
        return [(new Node(key)), edges];
    }

    if (key < node.key) {
        node.left = insertNodeHelperRec(node.left, key, callback)[0];
        addEdgesToChildren(node, edges, i)
    } else if (key > node.key) {
        node.right = insertNodeHelperRec(node.right, key, callback)[0];
        addEdgesToChildren(node, edges, i)
    } else {
        return [node, edges];
    }

    node.height = 1 + Math.max(height(node.left), height(node.right));
    let balanceFactor = getBalanceFactor(node);

    if (balanceFactor > 1) {
        if (key < node.left.key) {
            callback()
            let result = [rightRotate(node), edges];
            ++i;
            addEdgesToChildren(result[0], edges, i)
            return result
        } else if (key > node.left.key) {
            callback()
            node.left = leftRotate(node.left);
            ++i
            addEdgesToChildren(node, edges, i)
            callback()
            let result = [rightRotate(node), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }

    if (balanceFactor < -1) {
        if (key > node.right.key) {
            callback()
            let result = [leftRotate(node), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        } else if (key < node.right.key) {
            callback()
            node.right = rightRotate(node.right);
            ++i
            addEdgesToChildren(node, edges, i)
            callback()
            let result = [leftRotate(node), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }

    return [node, edges];
}

function addEdgesToChildren(root, edges, i) {
    if (edges.length - 1 < i)
        edges.push([])
    if (root.left !== null) {
        let source = root.key
        let target = root.left.key
        edges[i].push({data: {id: uuidv4(), source, target}})
        addEdgesToChildren(root.left, edges, i)
    }
    if (root.right !== null) {
        let source = root.key
        let target = root.right.key
        edges[i].push({data: {id: uuidv4(), source, target}})
        addEdgesToChildren(root.right, edges, i)
    }
}

export function insertNode(key) {
    let [root1, edges] = insertNodeHelper(root, key);
    root = root1
    return edges
}


function nodeWithMinimumValue(node) {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
}

function deleteNodeHelper(root, key) {
    let edges = [[]]
    let i = 0
    const callbackFunc = () => {
        addEdgesToChildren(root, edges, i)
        ++i
    }

    if (root == null) {
        return [root, edges];
    }
    if (key < root.key) {
        root.left = deleteNodeHelperRec(root.left, key, callbackFunc)[0];
        addEdgesToChildren(root, edges, i)
    } else if (key > root.key) {
        root.right = deleteNodeHelperRec(root.right, key, callbackFunc)[0];
        addEdgesToChildren(root, edges, i)
    } else {
        if ((root.left === null) || (root.right === null)) {
            let temp = null;
            if (temp == root.left) {
                temp = root.right;
            } else {
                temp = root.left;
            }

            if (temp == null) {
                temp = root;
                root = null;
            } else {
                root = temp;
            }
        } else {
            let temp = nodeWithMinimumValue(root.right);
            root.key = temp.key;
            root.right = deleteNodeHelperRec(root.right, temp.key, callbackFunc)[0];
            addEdgesToChildren(root, edges, i)
        }
    }
    if (root == null) {
        return [root, edges];
    }

    root.height = Math.max(height(root.left), height(root.right)) + 1;
    let balanceFactor = getBalanceFactor(root);

    if (balanceFactor > 1) {
        if (getBalanceFactor(root.left) >= 0) {
            let result = [rightRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        } else {
            root.left = leftRotate(root.left);
            ++i
            addEdgesToChildren(root, edges, i)
            let result = [rightRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }
    if (balanceFactor < -1) {
        if (getBalanceFactor(root.right) <= 0) {
            let result = [leftRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        } else {
            root.right = rightRotate(root.right);
            ++i
            addEdgesToChildren(root, edges, i)
            let result = [leftRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }
    return [root, edges];
}

function deleteNodeHelperRec(root, key, callback) {
    let edges = [[]]
    let i = 0

    if (root == null) {
        return [root, edges];
    }
    if (key < root.key) {
        root.left = deleteNodeHelperRec(root.left, key, callback)[0];
        addEdgesToChildren(root, edges, i)
    } else if (key > root.key) {
        root.right = deleteNodeHelperRec(root.right, key, callback)[0];
        addEdgesToChildren(root, edges, i)
    } else {
        if ((root.left === null) || (root.right === null)) {
            let temp = null;
            if (temp == root.left) {
                temp = root.right;
            } else {
                temp = root.left;
            }

            if (temp == null) {
                temp = root;
                root = null;
            } else {
                root = temp;
            }
        } else {
            callback()
            let temp = nodeWithMinimumValue(root.right);
            root.key = temp.key;
            root.right = deleteNodeHelperRec(root.right, temp.key, callback)[0];
            addEdgesToChildren(root, edges, i)
        }
    }
    if (root == null) {
        return [root, edges];
    }

    root.height = Math.max(height(root.left), height(root.right)) + 1;
    let balanceFactor = getBalanceFactor(root);

    if (balanceFactor > 1) {
        if (getBalanceFactor(root.left) >= 0) {
            callback()
            let result = [rightRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        } else {
            callback()
            root.left = leftRotate(root.left);
            ++i
            addEdgesToChildren(root, edges, i)
            callback()
            let result = [rightRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }
    if (balanceFactor < -1) {
        if (getBalanceFactor(root.right) <= 0) {
            callback()
            let result = [leftRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        } else {
            callback()
            root.right = rightRotate(root.right);
            ++i
            addEdgesToChildren(root, edges, i)
            callback()
            let result = [leftRotate(root), edges]
            ++i
            addEdgesToChildren(result[0], edges, i)
            return result;
        }
    }
    return [root, edges];
}

export function deleteNode(key) {
    let [root1, edges] = deleteNodeHelper(root, key);
    root = root1
    console.log(root)
    console.log(edges)
    return edges
}

export function findNode(key) {
    return findNodeHelper(root, key)
}

function findNodeHelper(root, key) {
    let path = []
    const callbackFunc = (key) => {
        path.push(key)
    }
    if(root !== null) {
        path.push(root.key)
    }
    if (key > root.key && root.right !== null) {
        findNodeHelperRec(root.right, key, callbackFunc)
    } else if (key < root.key && root.left !== null) {
        findNodeHelperRec(root.left, key, callbackFunc)
    } else if (key === root.key){
    }
    return path
}

function findNodeHelperRec(root, key, callback) {
    callback(root.key)
    if (key > root.key && root.right !== null) {
        findNodeHelperRec(root.right, key, callback)
    } else if (key < root.key && root.left !== null) {
        findNodeHelperRec(root.left, key, callback)
    } else if (key === root.key){
    }
}
