class _Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    insertFirst(item) {
        // create a new node
        let newNode = new _Node(item)

        // if list is empty: set head and tail to new Node
        if(!this.length) {
            this.head = newNode
            this.tail = newNode
        } else {
            // set the new node's next to current head
            newNode.next = this.head

            // set the current head's prev to new node
            this.head.prev = newNode

            // set list's head to new node
            this.head = newNode
        }
        
        // increase length by 1 node
        this.length += 1
    }

    insertBefore(item, key) {
        // check to see if list is empty
        // if empty, insertBefore should exit
        if (this.head === null) {
            return
        }

        // if key is the first item in the list, insert item first
        if (this.head.value === key) {
            this.insertFirst(item)
            return
        }

        // keep track of our previous node and current node
        let previousNode = null
        let currNode = this.head

        //traverse till we find the key
        while (currNode !== null && currNode.value !== key) {
            previousNode = currNode
            currNode = currNode.next
        }

        // key doesn't exist
        if (currNode === null) {
            console.log('Node not found to insert')
            return
        }

        // create new node
        let newNode = new _Node(item)

        // insert between the previous node and (before) current node
        newNode.prev = previousNode
        newNode.next = currNode
        previousNode.next = newNode
        currNode.prev = newNode
        currNode = newNode 
        this.length += 1     
    }

    insertAfter(item, key) {
        // check to see if list is empty
        // if empty, insertAfter should exit
        if (this.head === null) {
            return
        }

        // keep track of our previous node and current node
        let previousNode = null
        let currNode = this.head

        //traverse till we find the key
        while (currNode !== null && currNode.value !== key) {
            previousNode = currNode
            currNode = currNode.next
        }

        // key doesn't exist
        if (currNode === null) {
            console.log('Node not found to insert')
            return
        }

        // create new Node
        let newNode = new _Node(item)

        // insert after the current node
        newNode.prev = currNode
        newNode.next = currNode.next
        // currNode.prev = newNode
        previousNode.next = currNode
        currNode.next.prev = newNode
        currNode.next = newNode
        this.length += 1
    }

    insertAt(item, i) {
        // if empty, insertAt should exit 
        if (this.head === null) {
            console.log('List is empty')
            return
        }

        // if index is the first in the list
        if (i === 0) {
            this.insertFirst(item)
            return
        }

        // keep track of current node, iterate through using helper function
        // let previousNode = currNode
        let currNode = this._findnthElement(i - 1)

        // if index doesn't exist, return error
        if (!currNode) {
            console.log('Index out of bounds')
            return
        }

        //create newNode, set newNode next to the currNode.next, and make currNode.next = newNode for splicing
        let newNode = new _Node(item)
        
        newNode.prev = currNode
        newNode.next = currNode.next
        currNode.next.prev = newNode
        currNode.next = newNode
        this.length += 1
    }

    insertLast(item) {
        // create a new node
        let newNode = new _Node(item)

        // if list is empty, the new node becomes the head and tail
        if(!this.length) {
            this.head = newNode
            this.tail = newNode
        } else {
            // current tail points forward to the new node
            this.tail.next = newNode

            // the new node should point back to the current tail
            newNode.prev = this.tail

            // the new node should become the new tail
            this.tail = newNode
        }

        // increase length by 1 node
        this.length +=1
    }

    _findnthElement(pos) {
        let node = this.head

        try {
        for ( let i = 0; i < pos; i++) {
            node = node.next
        }
        } catch(e) {
            return null
        }
        return node
    }

    find(item) {
        // start at the head
        let currNode = this.head
        // if the list is empty
        if (!this.head) {
            return null
        }
        //check for the item
        while (currNode.value !== item) {
            // return null if its the end of the list and the item is not on the list
            if (currNode.next === null) {
                return null
            }
            else {
                // otherwise keep looking
                currNode = currNode.next
            }
        }
        // found it
        return currNode
    }

    remove(item) {
        // if the list is empty
        if (!this.head) {
            return null
        }
        // if the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next
            return
        }
        // start at the head
        let currNode = this.head
        // keep track of previous
        let previousNode = this.head

        while (( currNode !== null) && (currNode.value !== item)) {
            // save the previous node
            previousNode = currNode
            currNode = currNode.next
        }
        if (currNode === null) {
            console.log('Item not found')
            return
        }
        previousNode.next = currNode.next
        currNode.next.prev = previousNode
    }
}

let DLL = new DoubleLinkedList()

function mainDLL() {
    DLL.insertFirst('Aquaria')
    DLL.insertLast('Caprica')
    DLL.insertLast('Gemenon')
    DLL.insertLast('Picon')
    DLL.insertLast('Sagittaron')
    DLL.insertLast('Tauron')
    DLL.remove('Picon')
}

mainDLL()



function reversedDLL(list) {  
    if(list.head === null) {
        return
    }

    let currNode = list.head
    list.tail = currNode

    while (currNode !== null) {
        let previousNode = currNode.prev
        currNode.prev = currNode.next
        currNode.next = previousNode

        if (currNode.prev) {
            currNode = currNode.prev
        } else {
            list.head = currNode
            break
        }
    }
}

reversedDLL(DLL)



function displayList(list) {
    this.head = list.head

    if (this.head) {
        let currNode = this.head
        while (currNode.next) {
            console.log(currNode)
            currNode = currNode.next
        }
        console.log(currNode)
    }
}

displayList(DLL)

