var muuriWrapper = {};
var selectedElement = null;
var selectIdToMoori = {};
var selectIdToParentMoori = {}
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        function MuuriPair(outer, inner) {
            this.outerElement = outer;
            this.contentElement = inner;
        }

        var questionMuuriArray = [] ;
        var idSequence = 0;
        var textareaIdSequence = 0;

        var addQuestionButton = document.getElementById("addQuestion");
        var deleteQuestionButton = document.getElementById("deleteQuestion");
        var deleteSubQuestionButton = document.getElementById("deleteSubQuestion");
        var newTextAreaButton = document.getElementById("addTextArea");

        var templateElement = document.getElementById("templateArea");
        var versionElement = document.getElementById("versionArea");
        var testElement = document.getElementById("questionArea");

        var children = clearElement(templateElement);
        var templateMuuri = new Muuri(
            templateElement,
            {
                dragSort: templateSort,
                dragEnabled: true
            }
        );
        refillElement(children, templateMuuri);

        children = clearElement(versionElement);
        var versionMuuri = new Muuri(
            versionElement,
            {
                dragSort: versionSort,
                dragEnabled: true
            }
        );
        refillElement(children, versionMuuri);

        children = clearElement(testElement);
        var testMuuri = new Muuri(
            testElement,
            {
                dragStartPredicate: {
                    handle: '.question-heading'
                },
                dragSort: testSort,
                dragEnabled: true
            }
        );
        refillElement(children, testMuuri);

        function templateSort(item) {
            return [templateMuuri, testMuuri]
        }

        function versionSort(item) {
            return [versionMuuri]
        }

        function testSort(item) {
            return [templateMuuri, testMuuri]
        }

        function Init() {
            addQuestionButton.addEventListener('click', newQuestion);
            newTextAreaButton.addEventListener('click', newTextArea);
            deleteQuestionButton.addEventListener('click',deleteEventHandler);
            deleteSubQuestionButton.addEventListener('click',deleteEventHandler);
        }

        /*
        function createInjectMuuri(element,muuriOptions){
            var oldchildren = [];
            for (var i = 0; i < element.childNodes.length;i++){
                var child = element.removeChild(element.firstChild);
                oldchildren.push(child);
            }
            var muuri = new Muuri(element,muuriOptions)
            for (var i = 0; i < oldchildren.length;i++){
                addElementTo(oldchildren[i],muuri);
            }
            return muuri;
        }
        */

        function clearElement(element) {
            var oldchildren = [];
            while (element.hasChildNodes()) {
                var child = element.removeChild(element.firstChild);
                if (child.nodeType === Node.ELEMENT_NODE)
                    oldchildren.push(child);
            }
            return oldchildren;
        }

        function refillElement(oldchildren, muuri) {
            for (var i = 0; i < oldchildren.length; i++) {
                addElementTo(oldchildren[i], muuri);
            }
        }

        function newQuestion() {
            //creating markup
            var markup = createQuestionMarkup();
            markup.outerElement.addEventListener("click",selectEventHandler);
            addElementTo(markup.outerElement,testMuuri);
            //creating muuri
            questionMuuriArray.push(
                new Muuri(
                    markup.contentElement,
                    {
                        dragEnabled: true,
                        dragSort: function (item) {
                            return questionMuuriArray
                        }
                    }
                ).on('dragStart', function (item) {
                    item.getElement().style.width = item.getWidth() + 'px';
                    item.getElement().style.height = item.getHeight() + 'px';
                }).on('dragReleaseEnd', function (item) {
                    item.getElement().style.width = '';
                    item.getElement().style.height = '';
                    questionMuuriArray.forEach(function (muuri) {
                        muuri.refreshItems();
                    })
                }).on('layoutStart', function () {
                    testMuuri.refreshItems().layout();
                })
            );
            //addElementTo(createInnerQuestionMarkup(),questionMuuriArray[questionMuuriArray.length - 1]);
            //adding new question to grif

            //var innerMarkup = createInnerQuestionMarkup();
            //addElementTo(innerMarkup, questionMuuriArray[questionMuuriArray.length - 1]);
            selectIdToMoori[markup.outerElement.id] = questionMuuriArray[questionMuuriArray.length - 1];
            selectedElement = markup.outerElement;
            idSequence++;

            //var mrk = makeQHeading();

            //markup.outerElement.appendChild(mrk);

            return markup;
        }

        function newTextArea() {
            var markup = makeSubQuestionTextArea();
            markup.addEventListener("click",selectEventHandler);
            addElementTo(markup,selectIdToMoori[selectedElement.id]);
            selectIdToParentMoori[markup.id] = selectIdToMoori[selectedElement.id];
        }

        function deleteEventHandler(e) {
            if (selectedElement.classList.contains("question-container")){
                selectIdToMoori[selectedElement.id].destroy(true);
                testMuuri.remove([selectedElement.parentNode.parentNode],{removeElements: true});
            }
            if (selectedElement.classList.contains("subQuestion-container")){
                selectIdToParentMoori[selectedElement.id].remove([selectedElement.parentNode.parentNode],{removeElements: true});
            }
        }

        function createQuestionMarkup() {
            //wrapping div
            var questionDiv = document.createElement("div");
            questionDiv.classList.add("question-container");
            questionDiv.id = 'question-container-' + idSequence;

            questionDiv.appendChild(makeQHeading());
            //nested grid
            var gridDiv = document.createElement("div");
            gridDiv.classList.add('filldiv');
            gridDiv.id = 'question-grid-' + idSequence;
            questionDiv.appendChild(gridDiv);
            return new MuuriPair(questionDiv, gridDiv);
        }


        function addElementTo(element, grid) {
            //item
            var itemDiv = document.createElement("div");
            itemDiv.classList.add('item');
            //inner content
            var itemContentDiv = document.createElement("div");
            itemContentDiv.classList.add('item-content');
            itemDiv.appendChild(itemContentDiv);
            //adding to grid
            itemContentDiv.appendChild(element);
            grid.add(itemDiv);
        }


        function makeSubQuestionTextArea(){
            var divAnswerRow = document.createElement('div');
            divAnswerRow.classList.add('subQuestion-container');
            divAnswerRow.classList.add('answer-row');
            divAnswerRow.classList.add('textAreaDiv');
            divAnswerRow.id = 'subQuestion-container-' + idSequence;
            idSequence++;

            var divAnswerNum = document.createElement('div');
            divAnswerNum.classList.add('answer-number');
            divAnswerNum.innerHTML = '1.';

            var divAnswer = document.createElement('div');
            divAnswer.classList.add('answer');
            divAnswer.classList.add('textarea');
            divAnswer.id = 'textarea' + textareaIdSequence;
            textareaIdSequence++;
            divAnswer.setAttribute('contenteditable', 'true');
            divAnswer.innerHTML = 'Tohle je odpověď!';

            //var linkAnswerDel = document.createElement('a');
            //linkAnswerDel.classList.add('answer-delete');
            //linkAnswerDel.href = '#';


            //var imgItem = document.createElement('img');
            //imgItem.classList.add('tool-image');
            //imgItem.setAttribute('src', './images/delete.png');


            //linkAnswerDel.appendChild(imgItem);
            divAnswerRow.appendChild(divAnswerNum);
            divAnswerRow.appendChild(divAnswer);
            //divAnswerRow.appendChild(linkAnswerDel);

            return divAnswerRow;
        }

        function makeQHeading(){
            var divQHeading = document.createElement('div');
            divQHeading.classList.add('question-heading');

            var divQText = document.createElement('div');
            divQText.classList.add('question-text');
            divQText.classList.add('textarea');
            divQText.id = 'textarea' + textareaIdSequence;
            textareaIdSequence++;
            divQText.setAttribute('contenteditable', 'true');
            divQText.innerHTML = 'Takhle bude vypadat otázka!';


            divQHeading.appendChild(divQText);

            return divQHeading;
        }

        /*
        function makeSubQuestionTextArea(){
            var divQHeading = document.createElement('div');
            divQHeading.classList.add('answer-row');
            divQHeading.classList.add('textAreaDiv');

            var divQText = document.createElement('div');
            divQText.classList.add('question-text');
            divQText.classList.add('textarea');
            divQText.id = 'textarea' + textareaIdSequence;
            textareaIdSequence++;
            divQText.setAttribute('contenteditable', 'true');
            divQText.innerHTML = 'Takhle bude vypadat otázka!';


            divQHeading.appendChild(divQText);

            return divQHeading;
        }
        */
        Init();
    }).apply(muuriWrapper);
});

function selectEventHandler(e) {
    e.stopPropagation();
    if (selectedElement !== null) {
        selectedElement.classList.remove("selected");
    }
    selectedElement = e.currentTarget;
    selectedElement.classList.add("selected");
    if (selectedElement.classList.contains("question-container"))
        setToolbar("question");
    if (selectedElement.classList.contains("textAreaDiv"))
        setToolbar("textArea");
}