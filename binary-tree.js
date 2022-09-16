/** BinaryTreeNode: node for a general tree. */

const { Tree } = require("./tree");

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let depth = 0;
    if(!this.root) return depth;
    depth++;

    let queue = [this.root];
    let childQueue = [];
    while (queue.length){
      const currentNode = queue.shift();
      if(currentNode.left === null & currentNode.right === null) {
        return depth;
      } else {
        if (currentNode.left) childQueue.push(currentNode.left);
        if (currentNode.right) childQueue.push(currentNode.right);
      }
      if (queue.length === 0) {
        queue = childQueue;
        childQueue = [];
        depth++;
      }
    }

    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let max = 0
    let depth = 0;
    if(!this.root) return depth;

    let queue = [this.root];
    let childQueue = [];
    while (queue.length){
      const currentNode = queue.shift();
      if (currentNode.left) childQueue.push(currentNode.left);
      if (currentNode.right) childQueue.push(currentNode.right);
      if (queue.length === 0) {
        queue = childQueue;
        childQueue = [];
        depth++;
      }
    }

    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let max = 0
    function sumOf(node) {
      if(!node) {
        return 0;
      } else{
        const rightSum = sumOf(node.right)
        const leftSum = sumOf(node.left)
        max = Math.max(max, rightSum + leftSum + node.val);
        return Math.max(0, rightSum + node.val, leftSum + node.val);
      }
    }
    sumOf(this.root);
    return max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;

    function findLarger(node){
      if(!node) return null;
      if(result) {
        result = node.val > lowerBound && node.val < result ? node.val : result;
      } else {
        result = node.val > lowerBound ? node.val : result;
      }
      findLarger(node.right);
      findLarger(node.left);
    }

    findLarger(this.root);
    return result
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

    let parents = [this.root];
    let result = false;
    while (parents.length){
      let children = [];
      let cousins = [];
      for(let parent of parents){
        let sibling = [];
        if (parent.right) children.push(parent.right);
        if (parent.left) children.push(parent.left);

        if(parent.right === node1 || parent.right === node2){
          sibling.push(parent.right);
          cousins.push(parent.right);
        } 
        if (parent.left === node1 || parent.left === node2){
          sibling.push(parent.left);
          cousins.push(parent.left);
        } 
        if (sibling.length >= 2) return false;
      }
      if(cousins.length === 2) return true;
      cousins = [];
      parents = children;
    }
    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    
    function serializeHelper(node){
      if(!node) return null;
      return `[${node.val},[${serializeHelper(node.left)},${serializeHelper(node.right)}]]`
    }

    const output = serializeHelper(tree.root);
    console.log(output)
    return output
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const array = JSON.parse(stringTree)
    const newTree = new BinaryTree;
    const newRoot = new BinaryTreeNode(array[0]);
    newTree.root = newRoot;

    function makeNodes(array, node){
      if(array[0] === null){
        node.left = null;
        return
      }else if(array[0]){
        node.left = new BinaryTreeNode(array[0][0]);
        makeNodes(array[0][1], node.left)
      }
      if(array[1] === null){
        node.right = null;
        return
      }else if(array[1]){
        node.right = new BinaryTreeNode(array[1][0]);
        makeNodes(array[1][1], node.right)
      }
    }

    makeNodes(array[1],newTree.root);
    console.log(newTree)
    return newTree
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    let lowestAncestor = this.root;

    const findAncestor = (node)=>{
      if (node === node1 || node === node2){
        const rightNode = findAncestor(node.right);
        const leftNode = findAncestor(node.left);
        if(rightNode || leftNode){
          lowestAncestor = node;
        } else {
          return node;
        }
      } else if(node === null){
        return null;
      }else {
        const rightNode = findAncestor(node.right);
        const leftNode = findAncestor(node.left);
        if(rightNode && leftNode){
          lowestAncestor = node;
        } else if(rightNode){
          return rightNode
        } else if(leftNode){
          return leftNode
        }
      }
    };

    findAncestor(this.root);
    return lowestAncestor;
  }


}

module.exports = { BinaryTree, BinaryTreeNode };
