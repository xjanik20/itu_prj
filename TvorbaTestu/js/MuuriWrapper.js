document.addEventListener('DOMContentLoaded', function () {

    function MuuriPair(outer, inner) {
        this.outerElement = outer;
        this.contentElement = inner;
    }

    selectedElement = null;
    var questionMuuriArray = [];
    var idSequence = 0;
    var addQuestionButton = document.getElementById("addQuestion");


    var templateMuuri = new Muuri(
        document.getElementById("template-grid"),
        {
            dragSort:function () {
                return [templateMuuri,testMuuri];
            },
            dragEnabled: true
        }
    );

    var versionMuuri = new Muuri(
        document.getElementById("version-grid"),
        {
            dragSort: function (item) {
               return [versionMuuri]
            },
            dragEnabled: true
        }
    );
    var testMuuri = new Muuri(
        document.getElementById("test-grid"),
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

    function createTemplateMarkup() {
        var gridDiv = document.createElement("div");
        gridDiv.classList.add('template-grid');
        var itemDiv = gridDiv.createElement("div");
        itemDiv.classList.add('item');
        var itemContentDiv = itemDiv.createElement("div");
        itemContentDiv.classList.add('item-content');
        return new MuuriPair(gridDiv, itemContentDiv);
    }

    function createPartMarkup() {
        var gridDiv = document.createElement("div");
        gridDiv.classList.add('part-grid');
        var itemDiv = gridDiv.createElement("div");
        itemDiv.classList.add('item');
        var itemContentDiv = itemDiv.createElement("div");
        itemContentDiv.classList.add('item-content');
        return new MuuriPair(gridDiv, itemContentDiv);
    }

    function createTestMarkup() {
        var gridDiv = document.createElement("div");
        gridDiv.classList.add('test-grid');
        var itemDiv = gridDiv.createElement("div");
        itemDiv.classList.add('item');
        var itemContentDiv = itemDiv.createElement("div");
        itemContentDiv.classList.add('item-content');
        return new MuuriPair(gridDiv, itemContentDiv);
    }
    Init();
    });
