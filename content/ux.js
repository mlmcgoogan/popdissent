window.onload = function() {
	var buttons = document.getElementsByClassName('test');

	for (var i=0 ; i<buttons.length ; i++) {
		buttons[i].onclick = openEditBox;
	}
}

function openEditBox(e) {
	var caller = e.target;

	var form = document.createElement('form');
	form.action = 'addcomment';
	form.method = 'POST';

	var edit = document.createElement('div');
	edit.setAttribute('class', 'editbox');

	var titleField = document.createElement('input');
	titleField.setAttribute('type', 'text');
	titleField.name = 'title';

	var text = document.createElement('textarea');
	text.setAttribute('class', 'editfield');
	text.name = 'content';

	var parent = document.createElement('input');
	parent.type = 'hidden';
	parent.name = 'parent';
	parent.value = caller.parentNode.getAttribute('name');

	var submit = document.createElement('input');
	submit.setAttribute('type', 'submit');
	submit.setAttribute('value', 'Submit');

	edit.appendChild(form);
	form.appendChild(titleField);
	form.appendChild(text);
	form.appendChild(parent);
	form.appendChild(submit);

	caller.parentNode.appendChild(edit);
}