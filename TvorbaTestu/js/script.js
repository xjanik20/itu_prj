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
        iDiv.className += ' question';
        document.getElementById('col-main').appendChild(iDiv);
    }
    else {
        iDiv.className += ' answer';
        document.getElementById(focusId).appendChild(iDiv);
    }
    
    id = id + 1;
}

function addImage() {
    var iDiv = document.createElement('div');
    var iImage = document.createElement('img');
    var focus = documument.getElementById(focusId);
    
    iDiv.classList.add('testImgDiv');
    iDiv.classList.add('questionElement');
    iDiv.id = "testImage_" + id;
    id++;
    
    iImage.src('images\question.png');

    focus.appendChild(iDiv);
    iDiv.appendChild(iImage);
}

function addText() {
    var iDiv = document.createElement('div');
    var focus = documument.getElementById(focusId);

    iDiv.classList.add('testTextDiv');
    iDiv.classList.add('questionElement');
    iDiv.id = "testText_" + id;
    iDiv.setAttribute("contenteditable", true);
    id++;

    focus.appendChild(iDiv);
}

function addBlankSpace() {
    var iDiv = document.createElement('div');
    var focus = documument.getElementById(focusId);

    iDiv.classList.add('testBlankDiv');
    iDiv.classList.add('questionElement');
    iDiv.id = "testBlankSpace_" + id;
    id++;

    focus.appendChild(iDiv);
}

function addMultipleChoice() {
    var iDiv = document.createElement('div');
    var focus = documument.getElementById(focusId);

    iDiv.classList.add('testMultipleChoiceDiv');
    iDiv.classList.add('questionElement');
    iDiv.id = "testMultipleChoice_" + id;
    id++;

    for (var i = 0; i < 3 ; i++) {
        var iSubDiv = document.createElement('div');
        iSubDiv.classList.add('testMultipleChoiceOptionDiv');
        iSubDiv.classList.add('questionSubElement');
        iSubDiv.id = "testMultipleChoice_" + id;
        
        iDiv.appendChild(iSubDiv);
        var text = document.createTextNode("answer");
        iSubDiv.appendChild(text);
    }

    focus.appendChild(iDiv);
}

function selectElement(e) {
    e.stopPropagation();

    console.log(e.type);

    var className = e.target.className;
    var pattTextArea = new RegExp("textarea");
    var pattToolImage = new RegExp("tool-image");

    if (pattTextArea.test(className)) {
        focusId = e.target.id;
    }
    else {
        if (pattToolImage.test(className)) {
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