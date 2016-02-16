/*
*This is limited and unlimited size version of StackArray
*/
function StackArray(){
	this.arr = [];
	this.ptr = -1;
}

function StackArray(size){
	this.arr = [];
	this.size = size;
	this.ptr = -1;
}

StackArray.prototype = {
	
	isEmpty:function(){
		return (this.ptr == -1);
	},
	
	isFull:function(){
		return (this.ptr+1 == this.size);
	},
	
	setSize:function(size){
		this.size = size;
		this.arr = new Array(size);
	},
	
	push:function(data){
		this.arr[++this.ptr] = data;
	},
	
	pop:function(){
		return this.arr[this.ptr--];
	},
	
	top:function(){
		return this.arr[this.ptr];
	},
	
	getInputSize:function(){
		return this.ptr+1;
	},
	
	sort:function(stk){
		if(stk.isEmpty())
			return;
		var temp = stk.pop();
		this.sort(stk);
		this.insert(stk,temp);
	},
	
	insert:function(stk,temp){
		if(stk.isEmpty())
			stk.push(temp);
		else if(temp <= stk.top())
			stk.push(temp);
		else{
			var u = stk.pop();
			this.insert(stk, temp);
			stk.push(u);
		}
	}
}//End Class
