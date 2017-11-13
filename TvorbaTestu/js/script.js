var id = 0;
var focusId = -1;

//vlozeni otazky
function addDiv() {
    var iDiv = document.createElement('div');
    iDiv.className = 'textarea';
    iDiv.id = id;

    iDiv.setAttribute("contenteditable", true);
    iDiv.onclick = selectElement;
    //document.getElementById('1').appendChild(iDiv);
    if (focusId == -1) {
        iDiv.className += 'question';
        document.getElementById('col-main').appendChild(iDiv);
    }
    else {
        iDiv.className += 'answer';
        document.getElementById(focusId).appendChild(iDiv);
    }
    
    id = id + 1;
}

function selectElement(e) {
    e.stopPropagation();

    console.log(e.type);

    if (e.target.className == 'textarea') {
        focusId = e.target.id;
    }
    else {
        if (e.target.className != 'tool-image') {
            focusId = -1;
        }
    }

    console.log(focusId);
}

//nahradit TEXT
function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}