const Tree = require('./Tree');

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

Tree.buildTree(data);

console.log('isBalanced:', Tree.isBalanced());
console.log('Level order:', Tree.levelOrder());
console.log('Preorder:', Tree.preOrder());
console.log('Postorder:', Tree.postOrder());
console.log('In order:', Tree.inOrder());

Tree.insert(101);
Tree.insert(102);
Tree.insert(103);

console.log('isBalanced:', Tree.isBalanced());

Tree.rebalance();
Tree.print();