var id = 0;

//vlozeni otazky
function addDiv() {
    var iDiv = document.createElement('div');
    iDiv.className = 'textarea';
    iDiv.id = id;

    iDiv.setAttribute("contenteditable", true);
    iDiv.addEventListener('click', selectElement(id, event), false);

    //if (id == 2) {
        //document.getElementById('1').appendChild(iDiv);
    //}
    //else {
        document.getElementById('col-main').appendChild(iDiv);
    //}
    
    id = id + 1;
}

function selectElement(id, event) {
    //var e = document.getElementById('id').event;
    //event.stopPropagation();
    console.log("clicked");
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