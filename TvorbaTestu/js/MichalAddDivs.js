var id = 0;
var focusElement = -1;
/*
//vlozeni otazky
function addQuestion() {
    //vytvoreni divu pro celou otazku
    var questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.id = id;
    id = id + 1;
    questionContainer.onclick = selectElement;

    //vytvoreni divu pro text otazky
    var iDiv = document.createElement('div');
    iDiv.id = id;
    id = id + 1;

    iDiv.setAttribute("contenteditable", true);
    iDiv.className = 'textarea';
    iDiv.classList.add('question-text');
    iDiv.onclick = selectElement;

    //vlozeni textu do divu otazky
    console.log(id);
    console.log(id - 2);
    questionContainer.appendChild(iDiv);

    //vytvoreni divu pro odpovedi
    var ansDiv = document.createElement('div');
    ansDiv.id = id;
    id = id + 1;
    ansDiv.className = "answers-container";
    ansDiv.onclick = selectElement;

    //vlozeni odpovedi do divu otazky
    questionContainer.appendChild(ansDiv);

    document.getElementById('col-main').appendChild(questionContainer);


    //document.getElementById('1').appendChild(iDiv);
    /*if (focusId == -1) {
        iDiv.className += ' question';
        document.getElementById('col-main').appendChild(iDiv);
    }
    else {
        iDiv.className += ' answer';
        document.getElementById(focusId).appendChild(iDiv);
    }}*/

/*function addQuestion() {
    var question = muuriWrapper.newQuestion();
    var text1 = document.createTextNode("Otázka "+muuriWrapper.idSequence+" podotázka 1");
    var text2 = document.createTextNode("Otázka "+muuriWrapper.idSequence+" podotázka 2");
    muuriWrapper.addElementTo(text1,muuriWrapper.questionMuuriArray[muuriWrapper.idSequence-1]);
    muuriWrapper.addElementTo(text2,muuriWrapper.questionMuuriArray[muuriWrapper.idSequence-1]);
}*/

/*
function addAnswer() {

    console.log(focusId);
    if (focusId != -1) {
        //question-container??
        var className = document.getElementById(focusId).className;
        var pattQuestionContainer = new RegExp("question-container");
        if (pattQuestionContainer.test(className)) {

            var answer = document.createElement('div');
            answer.id = id;
            id = id + 1;

            answer.setAttribute("contenteditable", true);
            answer.className = 'answer';
            answer.onclick = selectElement;

            var ansId = parseInt(focusId) + 2;
            document.getElementById(String(ansId)).appendChild(answer);
        }
        var pattQuestionText = new RegExp("question-text");
        if (pattQuestionText.test(className)) {

            var answer = document.createElement('div');
            answer.id = id;
            id = id + 1;

            answer.setAttribute("contenteditable", true);
            answer.className = 'answer';
            answer.onclick = selectElement;

            var ansId = parseInt(focusId) + 1;
            document.getElementById(String(ansId)).appendChild(answer);
        }

        var pattAnswersContainer = new RegExp("answers-container");
        if (pattAnswersContainer.test(className)) {

            var answer = document.createElement('div');
            answer.id = id;
            id = id + 1;

            answer.setAttribute("contenteditable", true);
            answer.className = 'answer';
            answer.onclick = selectElement;

            var ansId = parseInt(focusId);
            document.getElementById(String(ansId)).appendChild(answer);
        }
    }


}
*/
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