var muuriWrapper = {};
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        function MuuriPair(outer, inner) {
            this.outerElement = outer;
            this.contentElement = inner;
        }

        this.selectedElement = null;

        var questionMuuriArray = [] ;
        var idSequence = 0;
        var addQuestionButton = document.getElementById("addQuestion");

        var templateElement = document.getElementById("templateArea")
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
            addQuestionButton.addEventListener('click', newQuestion)
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

        newQuestion : function newQuestion() {
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
                )
            );
            //addElementTo(createInnerQuestionMarkup(),questionMuuriArray[questionMuuriArray.length - 1]);
            //adding new question to grif
            idSequence++;
            var innerMarkup = createInnerQuestionMarkup();
            addElementTo(createInnerQuestionMarkup(), questionMuuriArray[questionMuuriArray.length - 1]);

            return markup;
        }


        function createQuestionMarkup() {
            //wrapping div
            var questionDiv = document.createElement("div");
            questionDiv.classList.add("question-container");
            //nested grid
            var gridDiv = document.createElement("div");
            gridDiv.classList.add('question-grid');
            gridDiv.id = 'question-grid-' + idSequence;
            questionDiv.appendChild(gridDiv);
            return new MuuriPair(questionDiv, gridDiv);
        }

        function createInnerQuestionMarkup() {
            var text = document.createTextNode("Nová otázka")
            var div = document.createElement("div");
            div.classList.add("question-container");
            div.appendChild(text);

            return div;
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



        Init();
    }).apply(muuriWrapper);
});

function selectEventHandler(e){
    e.stopPropagation();
    if (muuriWrapper.selectedElement !== null){
        muuriWrapper.selectedElement.classList.remove("selected");
    }
    muuriWrapper.selectedElement = e.currentTarget;
    muuriWrapper.selectedElement.classList.add("selected");

}