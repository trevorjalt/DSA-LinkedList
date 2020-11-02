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

    // Option without helper function
    // insertAt(item, i) {
    //     // if empty, insertAt should exit 
    //     if (this.head === null) {
    //         console.log('List is empty')
    //         return
    //     }

    //     // if index is the first in the list
    //     if (i === 0) {
    //         this.insertFirst(item)
    //         return
    //     }

    //     // keep track of current node
    //     let currNode = this.head

    //     if (!currNode) {
    //         console.log('Index out of bounds')
    //         return
    //     }

    //     try to iterate through, if index doesn't exist, return error
    //     try {
    //         for (let j = 0; j < i; j++) {
    //             currNode = currNode.next
    //         }
    //     } catch(e) {
    //         console.log('Index out of bounds', e)
    //         return
    //     }

    //     //create newNode, set newNode next to the currNode.next, and make currNode.next = newNode for splicing
    //     let newNode = new _Node(item, null)
        
    //     newNode.next = currNode.next
    //     currNode.next = newNode
    // }

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

const SLL = new LinkedList()

function main() {
    // const SLL = new LinkedList()

    SLL.insertFirst('Apollo')
    SLL.insertLast('Boomer')
    SLL.insertLast('Helo')
    SLL.insertLast('Husker')
    SLL.insertLast('Starbuck')
    SLL.insertLast('Tauhida')

    // SLL.remove('squirrel')
    // console.log(SLL.find('Helo'))

    SLL.insertBefore('Athena', 'Boomer')
    SLL.insertAfter('Hotdog', 'Helo')
    SLL.insertAt('Kat', 3)
    SLL.remove('Tauhida')


    // console.log(JSON.stringify(SLL, null, 2))
    // return SLL
    // console.log(SLL)

}

main()

// const SLL = main(SLL)

function display(list) {
    console.log(JSON.stringify(list, null, 2))
}

display(SLL)



function size(list) {
    let size = 0
    let currNode = list.head

    while (currNode !== null) {
        currNode = currNode.next
        size++
    }
    console.log(size)
}

size(SLL)



function isEmpty(list) {
    let currNode = list.head

    if (!currNode) {
        return true
    }

    return false
}

console.log(isEmpty(SLL))



function findPrevious(list, item) {
    let currNode = list.head

    while (currNode !== null && currNode.next.value !== item) {
        currNode = currNode.next
    }

    return currNode
}

console.log(findPrevious(SLL, 'Starbuck'))



function findLast(list) {
    let currNode = list.head

    while (currNode !== null && currNode.next !== null) {
        currNode = currNode.next
    }

    return currNode
}

console.log(findLast(SLL))



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

console.log('TEST')
console.log(reversedList(SLL))

display(SLL)



function thirdFromTheEnd(list) {
    let currNode = list.head

    while ( currNode.next.next.next !== null) {
        currNode = currNode.next
    }

    return currNode
}

console.log(thirdFromTheEnd(SLL))



function middleNode(list) {
    let slowNode = list.head
    let fastNode = list.head

    while (fastNode && fastNode.next) {
        slowNode = slowNode.next
        fastNode = fastNode.next.next
    }

    return slowNode   
}

console.log(middleNode(SLL))



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

console.log(cycleList(SLL))