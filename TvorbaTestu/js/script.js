var id = 0;
var focusElement = -1;

function addImage() {
    var iDiv = document.createElement('div');
    var iImage = document.createElement('img');

    iDiv.classList.add('testImgDiv');
    iDiv.id = "testImage-" + id;
    id++;

    iImage.src('images\question.png');

    muuriWrapper.addElementTo()
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

    //console.log(e.type);

    var className = e.target.className;
    var pattTextArea = new RegExp("textarea");
    var pattToolImage = new RegExp("tool-image");
    var pattFocused = new RegExp("focused");
    var pattQuestionContainer = new RegExp("question-container");
    var pattAnswersContainer = new RegExp("answers-container");

    if (pattTextArea.test(className) || pattQuestionContainer.test(className) || pattAnswersContainer.test(className)) {
        focusId = e.target.id;
        if (!pattFocused.test("focused")) {
            //e.target.className += ' focused';
            e.target.classList.add('focused');
        }
    }
    else {
        if (!pattToolImage.test(className)) {
            focusId = -1;
        }
    }

    console.log("selectElement--focusId: " + focusId);

    //setToolbar(arg)
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




// zmena toolbaru podle vybraneho prvku
function setToolbar(selectedElementType) {
    //event.stopPropagation();

    switch (selectedElementType) {
        case "textarea":

            document.getElementById('bold').style.display = 'inline';
            document.getElementById('italic').style.display = 'inline';
            document.getElementById('underline').style.display = 'inline';
            document.getElementById('textColor').style.display = 'inline';
            document.getElementById('highlight').style.display = 'inline';

            // answer part
            document.getElementById('deleteAnswer').style.display = 'none';
            document.getElementById('addImageAnswer').style.display = 'none';
            break;
        case "answer":
            document.getElementById('deleteAnswer').style.display = 'inline';
            document.getElementById('addImageAnswer').style.display = 'inline';

            // textpart
            document.getElementById('bold').style.display = 'none';
            document.getElementById('italic').style.display = 'none';
            document.getElementById('underline').style.display = 'none';
            document.getElementById('textColor').style.display = 'none';
            document.getElementById('highlight').style.display = 'none';
            break;
    }
    return false;
}


//uprava textu
function editText(char1, char2) {
    // ziskani textarea
    var textArea = document.getElementById(focusElement);

    var text = textArea.innerHTML;
    if ((text.search(char1) === 0) && (text.search(char2) === (text.length - 4)))
    {
        text = text.substr(3, (text.length - 4));
        textArea.innerHTML = text;
    }
    else
        textArea.innerHTML = char1 + text + char2;
}


//změna focusu
function changeFocus(id) {
    focusElement = id;
}

//smazat otázku
function deleteQuestion(id) {
    document.getElementById('xxx').remove();
}
