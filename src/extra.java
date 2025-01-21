// so we will talk about the BST

// if you wanna traverse the given bst like in the manner of inorder then it is not so easy
// to repoint the pointer to the new location 



// first way -> 
/*
 * find the inorder traversal of the BST and then you will get an array and then you can 
 * visit that array and you will then get the inorder traversal
 * 
 * public void inorderTraversal(TreeNode root , List<Integer> inorder){
 *      if(root == null) return;
 *      inorderTraversal(root.left);
 *      inorder.add(root.val);
 *      inorderTraversal(root.right);
 * }
 */



// second way
/*
 * in this way we try to create a skewed tree that is in the form of inorder 
 * meaning -> if we traverse that tree then we will get the inorder Traversal itself
 * 
 *  ROOT 
 *    \
 *    left subtree
 *      \
 *      root
 *       \
 *       right subtree
 * 
 * in this way you will get a right skewed tree 
 * and when you will traverse this tree then you will get the inorder traversal itself
 */