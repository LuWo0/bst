class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

}

class Tree {
    constructor(arr){
        this.root = this.buildTree(arr);
        this.preOrderArray = [];
        this.inOrderArray = [];
        this.postOrderArray = [];
    }

    buildTree(sortedArray){
        const arr = this.removeDuplicates(sortedArray);
        return this.treeify(arr, 0, arr.length - 1);
    }

    // Helper function to remove duplicates of the sorted array
    removeDuplicates(sortedArray){
        const set = [...new Set(sortedArray)];
        const res = Array.from(set);
        return res;
    }
    // Helper function that builds the tree
    treeify(array, start, end){
        if (start > end) return null;

        let mid = parseInt((start + end) / 2);
        let node = new Node(array[mid]);

        node.left = this.treeify(array, start, mid - 1);
        node.right = this.treeify(array, mid + 1, end);

        return node;
    }
    // Inserts element into the bst tree
    insert(value){  
        this.root = this.insertRec(this.root, value);
    }
    // Helper function to insert recursively down the tree
    insertRec(root, value){
        // base case
        if (root === null) {
            root = new Node(value);
            return root;
        } 

        if (value < root.value) {
            root.left = this.insertRec(root.left, value);
        } else if(value > root.value) {
            root.right = this.insertRec(root.right, value);
        }
        return root;
    }
    // removes an element from the bst tree
    remove(value){
        this.root = this.removeRec(this.root, value);
    }
    // Helper to remove recursively down the tree
    removeRec(root, value){
        //base case
        if (root === null) return root;

        // traverse tree until we find a match
        if (value < root.value){
            root.left = this.removeRec(root.left, value);
        } else if (value > root.value){
            root.right = this.removeRec(root.right, value);
        } else { //when we find a match 
            // case 1: Node has no child
            if (root.left === null){ 
                return root.right;
            // Case 2: Node with only one child or no child
            } else if (root.right === null){  
                return root.left;
            }
            // Case 3: Node has 2 children
            root.value = this.getSmallestValueNode(root.right); // get the smallest in the right subtree 

            root.right = this.removeRec(root.right, root.value);
        }
        return root;
    }
    //Helper function to get the smallest value of a tree or subtree 
    getSmallestValueNode(node){
        let minVal = node.value;
        
        while (node.left !== null){
            minVal = node.left.value;
            node = node.left;
        }
        return minVal;
    }

    find(value){
        return this.findRec(this.root, value);
    }

    findRec(root, value){
        if (root === null || root.value === value) return root;
        
        if (root.value < value){
            return this.findRec(root.right, value);
        }
        return this.findRec(root.left, value);
    }

    levelOrder(root){
        const queue = [];
        const result = [];

        if (root === null) return;

        queue.push(root);
        while (queue.length > 0){
            let current = queue.shift(root);
            result.push(current.value);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
        return result;
    }

    preorder(root){
        if(root === null) return;

        if (root.value !== undefined){
            this.preOrderArray.push(root.value);
        }

        if (root.left !== null){
            this.preorder(root.left);
        }
        if (root.right !== null){
            this.preorder(root.right);
        }
    }

    inorder(root){
        if(root === null) return;

        
        if (root.left !== null){
            this.inorder(root.left);
        }
        if (root.value !== undefined){
            this.inOrderArray.push(root.value);
        }
        if (root.right !== null){
            this.inorder(root.right);
        }
    }

    postorder(root){
        if (root === null) return;

        if (root.left !== null){
            this.postorder(root.left);
        }
        if (root.right !== null){
            this.postorder(root.right);
        }
        if (root.value !== undefined){
            this.postOrderArray.push(root.value);
        }
    }

    height(root){
        if (root === null) return -1;
            
        let left = this.height(root.left);
        let right = this.height(root.right);
        return Math.max(left, right) + 1;
        
    }
    depth(node, root = this.root){
        let depth = -1;
        if (node === null) return depth;

        if (
            root === node ||
            (depth = this.depth(node, root.left)) >= 0 ||
            (depth = this.depth(node, root.right) >= 0)
        ){
            return depth + 1;
        }
        return depth;
    }

    isBalanced(root){
        if (root === null) return false;

        let left = root.left;
        let right = root.right;

        if (Math.abs( this.height(left) - this.height(right) ) > 1){
            return false;
        }
        return true;
    }

    reBalance(){
        if (this.isBalanced(this.root)) return this.root;

        let rebalancedTreeArray = [];
        rebalancedTreeArray = this.traverse(this.root, rebalancedTreeArray);

        let balancedTree = new Tree(rebalancedTreeArray);

        return balancedTree.root;
    }
    traverse(root, array){
        if (array !== undefined){
            array.push(root.value);
        }
        if (root.left !== null){
            this.traverse(root.left, array);
        }
        if (root.right !== null){
            this.traverse(root.right, array);
        }
        return array;
    }
}

/*******************
 * 
 *  
 *  
 * 
 *  Driver Code
 * 
 * 
 * 
 *******************/




// const tree = new Tree([10, 20, 30, 40, 50, 60, 70, 80, 90]);

// console.log(`Balanced? ${tree.isBalanced(tree.root)}`);
// tree.preorder(tree.root);
// tree.inorder(tree.root);
// tree.postorder(tree.root);
// console.log(`Pre-Order:${tree.preOrderArray}`);
// console.log(`In-Order:${tree.inOrderArray}`);
// console.log(`Post-Order:${tree.postOrderArray}`);

// tree.insert(120);
// tree.insert(130);
// tree.insert(140);
// tree.insert(150);
// tree.insert(160);
// tree.insert(170);

// console.log(`Balanced? ${tree.isBalanced(tree.root)}`);

// tree.reBalance();

// console.log(`Balanced? ${tree.isBalanced(tree.root)}`);

// tree.preorder(tree.root);
// tree.inorder(tree.root);
// tree.postorder(tree.root);
// console.log(`Pre-Order:${tree.preOrderArray}`);
// console.log(`In-Order:${tree.inOrderArray}`);
// console.log(`Post-Order:${tree.postOrderArray}`);

// console.log(tree);
// console.log(`Level Order:${tree.levelOrder(tree.root)}`);





// const prettyPrint = (node, prefix = '', isLeft = true) => {
//     if (node.right !== null) {
//       prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//     }
//     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
//     if (node.left !== null) {
//       prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//     }
// }

// prettyPrint(tree.root);
