# Working with linked lists

## 2) Create a singly linked list

* Write a function main. Within the function, using the linked list class above, create a linked list with the name SLL and add the following items to your linked list: Apollo, Boomer, Helo, Husker, Starbuck.

* Add Tauhida to the list.

* Remove squirrel from the list.

* Implement a function called insertBefore() in the class that inserts a new node before a given node containing a key.

* Implement a function called insertAfter() in the class that inserts a new node after a node containing the key.

* Implement a function called insertAt() that inserts an item at a specific position in the linked list.

* Add Athena before Boomer using your insertBefore() function.

* Add Hotdog after Helo using the insertAfter() method.

* Using the insertAt() method insert Kat in the 3rd position of the list.

* Remove Tauhida from the list.

````
class _Node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class LinkedList {
    constructor () {
        this.head = null
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head)
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

        // insert between the previous node and (before) current node
        previousNode.next = new _Node(item, currNode)
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

        // insert after the current node
        currNode.next = new _Node(item, currNode.next)
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
        let currNode = this._findnthElement(i - 1)

        // if index doesn't exist, return error
        if (!currNode) {
            console.log('Index out of bounds')
            return
        }

        //create newNode, set newNode next to the currNode.next, and make currNode.next = newNode for splicing
        let newNode = new _Node(item, null)
        
        newNode.next = currNode.next
        currNode.next = newNode
    }

    insertLast(item) {
        // check to see if list is empty
        // if it is, insert the new item as the only item in the list
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            // start at beginning of the list and move through until you reach the end
            let tempNode = this.head
            while (tempNode.next !== null) {
                tempNode = tempNode.next
            }
            //set the end node's next pointer to the new node
            tempNode.next = new _Node(item, null)
        }
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
    }
}

function main() {
    const SLL = new LinkedList()

    SLL.insertFirst('Apollo')
    SLL.insertLast('Boomer')
    SLL.insertLast('Helo')
    SLL.insertLast('Husker')
    SLL.insertLast('Starbuck')
    SLL.insertLast('Tauhida')

    SLL.remove('squirrel')
    // console.log(SLL.find('Helo'))

    SLL.insertBefore('Athena', 'Boomer')
    SLL.insertAfter('Hotdog', 'Helo')
    SLL.insertAt('Kat', 3)
    SLL.remove('Tauhida')


    console.log(JSON.stringify(SLL, null, 2))
    // return SLL
    console.log(SLL)

}

main()
````

## 3) Supplemental functions for a linked list

Implement the following functions that operate on your linked list class. Note that these should be free functions instead of methods of the linked list class, so implement them outside the linked list class. Test each function using the list created in exercise 1.

* display: displays the linked list

````
function display(list) {
    console.log(JSON.stringify(list, null, 2))
}
````

* size: returns the size of the linked list

````
function size(list) {
    let size = 0
    let currNode = list.head

    while (currNode !== null) {
        currNode = currNode.next
        size++
    }
    console.log(size)
}
````

* isEmpty: finds if the list is empty or not (without using the size() function)

````
function isEmpty(list) {
    let currNode = list.head

    if (!currNode) {
        return true
    }

    return false
}
````

* findPrevious: finds the node before the item you are looking for

````
function findPrevious(list, item) {
    let currNode = list.head

    while (currNode !== null && currNode.next.value !== item) {
        currNode = currNode.next
    }

    return currNode
}
````

* findLast: returns the last node in the linked list

````
function findLast(list) {
    let currNode = list.head

    while (currNode !== null && currNode.next !== null) {
        currNode = currNode.next
    }

    return currNode
}
````

## 4) Mystery program

Analyze the following function (without running it in an IDE) to determine what problem it is trying to solve. What is the time complexity of this algorithm?

````
function WhatDoesThisProgramDo(lst) {
    let current = lst.head;
    while (current !== null) {
        let newNode = current;
        while (newNode.next !== null) {
            if (newNode.next.value === current.value) {
                newNode.next = newNode.next.next;
            }
            else {
                newNode = newNode.next;
            }
        }
        current = current.next;
    }
}
````

````
A:

It removes duplicate items
O(n^k)
````

# 5) Reverse a list

Write an algorithm to reverse a linked list. The time complexity of your algorithm should be linear (O(n)). For this exercise, notice we are not asking you just to print the linked list in reverse or use another linked list to store the value in reverse order. Your program should reverse the direction of a given singly linked list. In other words, all pointers should point backward. BONUS: Solve this problem using both recursive and iterative algorithms.

````
function reversedList(list) {
    let reversedHead = null
    let currNode = list.head
    let nextNode
   
    while (currNode !== null) {
        nextNode = currNode.next
        currNode.next = reversedHead
        reversedHead = currNode
        currNode = nextNode
    }

    list.head = reversedHead
    return list
}
````

## 6) 3rd from the end

Write an algorithm to find the 3rd element from the end of a linked list. Note You may be tempted to add a length property to your linked list class. The length property is not a typical property of linked list, therefore don't make any modification to the linked list class that is provided to you.

````    
function thirdFromTheEnd(list) {
    let currNode = list.head

    while ( currNode.next.next.next !== null) {
        currNode = currNode.next
    }

    return currNode
}
````

## 7) Middle of a list

Write an algorithm to find the middle element of a linked list. Note You may be tempted to add a length property to your linked list class. The length property is not a typical property of linked list, therefore don't make any modification to the linked list class that is provided to you. Also, finding the size of the linked list using the size() function and dividing it by half will not find the correct middle of the linked list. So, don't use either of these approaches.

````
function middleNode(list) {
    let slowNode = list.head
    let fastNode = list.head

    while (fastNode && fastNode.next) {
        slowNode = slowNode.next
        fastNode = fastNode.next.next
    }

    return slowNode   
}
````

## 8) Cycle in a list

Write an algorithm to find whether a linked list has a cycle (i.e., whether a node in the list has its next value pointing to an earlier node in the list). For this exercise, create a linked list with the name CycleList. Be sure to insert nodes in the list so that it has a cycle. Then test your program with a cycleList function.

````
function cycleList(list) {
    let item1 = list.head
    let item2 = list.head

    while (item1 !== item2) {
        item1 = item1.next
        item2 = item2.next.next
    }
    if (item1 === item2) {
        return true
    }
    return false
}
````

## 9) Doubly linked list

Implement a doubly linked list. The primary functions of the doubly linked list would be insert (First, Last, Before, After, and At), remove, and find. Write a function mainDLL, and within it create the doubly linked list DLL and add the following items to it: Aquaria, Caprica, Gemenon, Picon, Sagittaron.

* Add Tauron to the list

* Remove Picon from the list

````
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

````

## Reverse a DLL

Given the doubly linked list above, write a program that reverses the doubly linked list. How is this implementation different than reversing the singly linked list?

````
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
````