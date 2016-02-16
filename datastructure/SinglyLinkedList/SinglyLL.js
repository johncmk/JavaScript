/**Singly LinkedList in Javascript; insert, delete, search, sort, reverse...
*/

function node(data){
	this.data = data;
	this.next = null;
}

function LinkedList(){
	this.size = 0;
	this.head = null;
}	

LinkedList.prototype.empty = function(){
	return (this.head == null);
}

LinkedList.prototype.getSize = function(){
	return this.size;
}

LinkedList.prototype.printList = function(){
	if(this.empty())
		return;
	var current = this.head;
	while(current !== null){
		console.log(current.data);
		current = current.next;
	}	
}

LinkedList.prototype.insert = function(data){
	var newNode = new node(data);
	if(!this.empty()){
		newNode.next = this.head;
		this.head = newNode;	
	}else
		this.head = newNode;
	this.size++;
}

LinkedList.prototype._search = function(data, previous){
	var current = previous.next;
	try{
		return (current.data == data)? previous: (current == null)? data + " not found" : this._search(data,current);
	}catch(err){
		console.log(data + " not found in the list");
	}
}

LinkedList.prototype.search = function(data){
	if(this.empty())
		console.log("The list is empty");
	var previous = this.head;
	var current = previous.next;
	if(previous.data == data || current.data == data)
		return previous;
	return this._search(data, current);
}

LinkedList.prototype.deleteCase1 = function(found){
	return (found == null || this.empty());
}

LinkedList.prototype.deleteCase2 = function(found){
	return (this.head == found);
}

LinkedList.prototype.deleteCase3 = function(previous,current){
	previous.next = (current.next != null)? current.next:null;
}

LinkedList.prototype.delete = function(data){
	var found = this.search(data);
	if(this.deleteCase1(found))
		return;
	else if(this.deleteCase2(found))
		this.head = found.next;
	else
		this.deleteCase3(found,found.next);
	this.size--;
}

LinkedList.prototype.reverse = function(){
	if(this.empty())
		return;
	var previous = null;
	var current = this.head;
	var next = null;
	while(current != null){
		next = current.next;
		current.next = previous
		previous = current;
		current = next;
	}
		this.head = previous;
}

LinkedList.prototype.reverseRecursive = function(){
	if(this.empty())
		return;
	this._reverseRecursive(this,this.head);
}

LinkedList.prototype._reverseRecursive = function(li,liHead){
	var front = liHead;
	var rear = liHead.next;
	if(rear == null){
		li.head = front;
		return;
	}
	this._reverseRecursive(li,rear);
	rear.next = front;
	front.next = null;
}

LinkedList.prototype.mergeSort = function(){
	this.head = this._mergeSort(this.head);
}

LinkedList.prototype._mergeSort = function(hNode){
	if(hNode == null || hNode.next == null)
		return hNode;
	var left = hNode;
	var mid = this.getMid(hNode);
	var right = mid.next;
	mid.next = null;
	
	var l = this._mergeSort(left);
	var r = this._mergeSort(right);
	return this.merge(l,r);
}

LinkedList.prototype.getMid = function(hNode){
	if(hNode == null)
		return null;
	var fast = hNode;
	var slow = hNode;
	while(fast != null && fast.next != null && (fast.next).next != null){
		fast = (fast.next).next;
		slow = slow.next;
	}
	return slow;
}

LinkedList.prototype.merge = function(left,right){
	var result;
	if(left == null)
		return right;
	else if (right == null)
		return left
	else if (left.data <= right.data){
		result = left;
		result.next = this.merge(left.next, right);
	}else{
		result = right;
		result.next = this.merge(left, right.next);
	}
	return result;
}
