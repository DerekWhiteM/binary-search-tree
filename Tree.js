const Node = require('./Node');

class Tree {

    static root = null;

    static balance(node = this.root) {
        if (!node) return 0;
        let lh = this.balance(node.left);
        if (lh === -1) return -1;
        let rh = this.balance(node.right);
        if(rh === -1) return -1;
        if (Math.abs(lh - rh) > 1) return -1;
        else return Math.max(lh, rh) + 1;
    }

    static buildTree(arr) {
        const dedupedArr = arr.filter((item, index) => arr.indexOf(item) === index);
        const sortedArr = dedupedArr.sort((a, b) => a - b);
        return this.root = sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
        function sortedArrayToBST(arr, start, end) {
            if (start > end) return null;
            const mid = parseInt((start + end) / 2);
            const node = new Node(arr[mid]);
            node.left = sortedArrayToBST(arr, start, mid - 1);
            node.right = sortedArrayToBST(arr, mid + 1, end);
            return node;
        }
    }

    static delete(value) {

        deleteRec(this.root, value);

        function deleteRec(node, value) {
            if (node === null) return null;
            if (value < node.value) {
                node.left = deleteRec(node.left, value);
            }
            else if (value > node.value) {
                node.right = deleteRec(node.right, value);
            }
            else {
                if (node.left === null) return node.right;
                else if (node.right === null) return node.left;
                node.value = minValue(node.right);
                node.right = deleteRec(node.right, node.value);
            }
            return node;
        }

        function minValue(node) {
            let min = node.value;
            while (node.left !== null) {
                node = node.left;
                min = node.left.value;
            }
            return min;
        }

    }

    static depth(node) {
        let depth = 0;
        findRec(this.root, node.value);
        return depth;
        
        function findRec(node, value) {
            if (node === null || node.value === value) return node;
            depth++;
            if (node.value < value) return findRec(node.right, value);
            return findRec(node.left, value);
        }
    }

    static find(value) {

        return findRec(this.root, value);
        
        function findRec(node, value) {
            if (node === null || node.value === value) return node;
            if (node.value < value) return findRec(node.right, value);
            return findRec(node.left, value);
        }

    }

    static height(node = this.root) {
        
        let height = heightRec(node)
        
        return height === 0
            ? height
            : height - 1;

        function heightRec(node) {
            if (!node) return 0;
            return Math.max(heightRec(node.left), heightRec(node.right) + 1);
        }
    }

    static inOrder(suppliedFunc) {
        const visited = [];
        const func = suppliedFunc
            ? suppliedFunc
            : pushToVisted
        inOrderRec(this.root);
        if (!suppliedFunc) return visited;
        
        function inOrderRec(node) {
            if (!node) return;
            inOrderRec(node.left);
            func(node);
            inOrderRec(node.right);
        }

        function pushToVisted(node) {
            return visited.push(node.value);
        }
        
    }

    static insert(value) {

        insertRec(this.root, value);

        function insertRec(node, value) {
            if (node === null) {
                node = new Node(value);
                return node;
            }
            if (value < node.value) {
                node.left = insertRec(node.left, value);
            }
            else if (value > node.value) {
                node.right = insertRec(node.right, value);
            }
            return node;
        }

    }

    static isBalanced() {
        return this.balance() > 0
            ? true
            : false;
    }

    static levelOrder(suppliedFunc) {

        const queue = [];
        const visited = [];
        const func = suppliedFunc
            ? suppliedFunc
            : pushToVisted
        traverseRec(this.root);
        if (!suppliedFunc) return visited;

        function traverseRec(node) {
            if (!node) { return; }
            func(node);
            queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            return traverseRec(queue[0]);
        }

        function pushToVisted(node) {
            return visited.push(node.value);
        }

    }

    static postOrder(suppliedFunc) {
        const visited = [];
        const func = suppliedFunc
            ? suppliedFunc
            : pushToVisted
        postOrderRec(this.root);
        if (!suppliedFunc) return visited;
        
        function postOrderRec(node) {
            if (!node) return;
            postOrderRec(node.left);
            postOrderRec(node.right);
            func(node);
        }

        function pushToVisted(node) {
            return visited.push(node.value);
        }
        
    }

    static preOrder(suppliedFunc) {
        const visited = [];
        const func = suppliedFunc
            ? suppliedFunc
            : pushToVisted
        preOrderRec(this.root);
        if (!suppliedFunc) return visited;
        
        function preOrderRec(node) {
            if (!node) return;
            func(node);
            preOrderRec(node.left);
            preOrderRec(node.right);
        }

        function pushToVisted(node) {
            return visited.push(node.value);
        }

    }

    static print() {
        if (this.root === null) {
            console.log(null);
        } else {
            prettyPrint(this.root);
        }
        function prettyPrint(node, prefix = '', isLeft = true) {
            if (node.right !== null) {
                prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
            if (node.left !== null) {
                prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
        }
    }

    static rebalance() {
        const arr = Tree.inOrder();
        Tree.buildTree(arr);
    }

}

module.exports = Tree;