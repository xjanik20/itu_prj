document.addEventListener('DOMContentLoaded', function () {

    function MuuriPair(outer, inner) {
        this.outerElement = outer;
        this.contentElement = inner;
    }

    selectedElement = null;
    var questionMuuriArray = [];
    var idSequence = 0;
    var addQuestionButton = document.getElementById("addQuestion");


    var templateMuuri = createInjectMuuri(
        document.getElementById("templateArea"),
        {
            dragSort:function () {
                return [templateMuuri,testMuuri];
            },
            dragEnabled: true
        }
    );

    var versionMuuri = createInjectMuuri(
        document.getElementById("versionArea"),
        {
            dragSort: function (item) {
               return [versionMuuri]
            },
            dragEnabled: true
        }
    );
    var testMuuri = createInjectMuuri(
        document.getElementById("questionArea"),
        {
            dragSort: function (item) {
                return [testMuuri,templateMuuri]
            },
            dragEnabled: true
        }
    );

    function Init(){
        addQuestionButton.addEventListener('click',newQuestion)
    }

    function createInjectMuuri(element,muuriOptions){
        var oldchildren = [];
        for (var i = 0; i < element.childNodes.length;i++){
            oldchildren.push(element.removeChild(element.childNodes[0]))
        }
        var muuri = new Muuri(element,muuriOptions)
        for (var i = 0; i < oldchildren.length;i++){
            addElementTo(oldchildren[i],muuri);
        }
        return muuri;
    }

    function newQuestion() {
        //creating markup
        var markup = createQuestionMarkup();
        testMuuri.add(markup.outerElement);
        //creating muuri
        questionMuuriArray.push(
            new Muuri(
                markup.contentElement,
                {
                    dragEnabled: true,
                    dragSort: function(item){
                        return questionMuuriArray
                    }
                }
            )
        );
        //adding new question to grif
        idSequence++;
        return markup;
    }

    function createQuestionMarkup() {
        //item
        var itemDiv = document.createElement("div");
        itemDiv.classList.add('item');
        //item-content
        var itemContentDiv = document.createElement("div");
        itemContentDiv.classList.add('item-content');
        itemDiv.appendChild(itemContentDiv);
        //nested grid
        var gridDiv = document.createElement("div");
        gridDiv.classList.add('question-grid');
        gridDiv.id = 'question-grid-' + idSequence;
        itemContentDiv.appendChild(gridDiv);
        return new MuuriPair(itemDiv, gridDiv);
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
    });
