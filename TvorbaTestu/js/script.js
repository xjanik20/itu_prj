var id = 0;
var focusId = -1;

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
    }*/


}

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