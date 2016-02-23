/*
Validation sample
This library does not require JQuery.
inspired by Laravel validator

Laravel Ver.
ex:
	$this->validate($request, [
	    'title' => 'required|unique:posts|max:255',
	    'author.name' => 'required',
	    'author.description' => 'required',
	]);

======================================================================================
SAMPLE USAGE
======================================================================================
The first param passes array to validate each id value orderly.
The second param passes dictionary that maps id of the first param then returns regex rules
validate([id arr], {id: "required|name"})

ex:

	<input id="name" type="text"/>
	<input id="age" type="text"/>

	var fail = validate(['name','age'], 
	{
		'name' : "required|name| customized error",
		'age': 'required|digit'
	});

	if(fail) {
		return false;
	}
======================================================================================
======================================================================================
*/

/*
 * 1.add new variable that contains Regex rule.
 * 2.add the regex variable into the regex json follow by key that matches to the variable name.
 * 3.add new case in the switch statement under get_msg function.
 */

//1
var required =/([\s]*)/;
var name = /[A-Za-z]/g;
var digit = /[0-9]/g;

//2
var regex = {
		"required": required,
		"name":name,
		"digit":digit
	}

function validate(li, li_rgx) {

	var msg = "";

	for(i in li) {
		var id = li[i];
		
		rules = li_rgx[id];
		rules.split("|").forEach(function(rule) { 
			msg += get_msg(id, rule) + "\n";
		});

		var custom_err = msg.split("|");
		var last_index = custom_err.length-1

		if(custom_err[last_index].indexOf("custom_err") > -1 ) {
			msg = custom_err[last_index-1] + "\n";
		}
	}

	if(msg.length > 0) {
		alert(msg);
		return true;
	}
}

//3
function get_msg(id, rule) {
	
	var msg = "";
	var flag;
	var id_val = document.getElementById(id).value;

	switch(rule) {

		case "required":
			flag = new RegExp(regex[rule]).test(id_val);
			if(!flag) {
				msg+= "[ID: " +id+ "] This field is required";
			}
			break;

		case "name":
			flag = new RegExp(regex[rule]).test(id_val);
			if(!flag) {
				msg+= "[ID: " +id+ "] Only letters are allowed";
			}
			break;

		case "digit":
			flag = new RegExp(regex[rule]).test(id_val);
			if(!flag) {
				msg+= "[ID: " +id+ "] digits are allowed";
			}
			break;

		default:
			var customized_err = rule;
			msg = "|[ID: " + id + "] " + customized_err + "|custom_err";
			break;
	}
 
	return msg;
}
