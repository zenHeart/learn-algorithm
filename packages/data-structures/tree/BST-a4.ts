// 节点结构
abstract class BstNode {
    public key: string;
    public value: number;
    public left: BstNode;
    public right: BstNode;  
    public N: number; // 子树节点总数
}

// 二叉树结构
abstract class BST_ABSTRACT {
    private root: BstNode
    public abstract  size(n: BstNode): number
    public abstract get(k: String) : number
    public abstract put(k,val): boolean
    public abstract min(): number
    public abstract min(): number
    public abstract floor(): number
    public abstract ceiling(): number
    public abstract select(): number
    public abstract rank(): number
    public abstract delete(): number
    public abstract deleteMin(): number
    public abstract deleteMax(): number
    public abstract keys(): number
}

