/*
* Circular Queue. 
* set default size to 100;
*/
function Queue(){
	this.size = 100;
	this.arr = [];
	this.front = -1;
	this.rear = -1;
}

function Queue(size){
	this.size = size;
	this.arr = new Array(size)
	this.front = -1;
	this.rear = -1;
}

Queue.prototype = {
	
	isEmpty:function(){
		return (this.front == -1 && this.rear == -1);
	},
	
	getSize:function(){
		return (this.size);
	},
	
	getInputSize:function(){
		return (this.isEmpty())? 0: (this.rear+1) - this.front;
	},
	
	isFull:function(){
		return (((this.rear+1) % this.size) == this.front);
	},
	
	hasOnlyOneElement:function(){
		return ((!this.isEmpty()) && (this.front == this.rear));
	},
	
	enqueue:function(data){
		if(this.isFull())
			return;
		else if(this.isEmpty()){
			this.front = 0;
			this.rear = 0;
		}else
			this.rear = (this.rear+1) % this.size;
		this.arr[this.rear] = data;
	},
	
	dequeue:function(){
		var pos = this.front;
		if(this.isEmpty())
			return -1;
		else if(this.hasOnlyOneElement()){
			this.front = -1;
			this.rear = -1;
		}else
			this.front = (this.front+1) % this.size;
		return this.arr[pos];
	},
	
	top:function(){
		if(this.isEmpty())
			return -1;
		return this.arr[this.front];
	}
}
