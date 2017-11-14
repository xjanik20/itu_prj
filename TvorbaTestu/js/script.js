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

// zmena toolbaru podle vybraneho prvku
function setToolbar(selectedElementType) {
    var elems;

    switch (selectedElementType) {
        case "textarea":

            document.getElementById('bold').style.display = 'inline';
            document.getElementById('italic').style.display = 'inline';
            document.getElementById('underline').style.display = 'inline';
            document.getElementById('textColor').style.display = 'inline';
            document.getElementById('highlight').style.display = 'inline';

            // question part
            document.getElementById('addQuestion').style.display = 'none';
            document.getElementById('addAnswerQuestion').style.display = 'none';
            document.getElementById('deleteQuestion').style.display = 'none';
            document.getElementById('addImageQuestion').style.display = 'none';
            // answer part
            document.getElementById('addAnswerAnswer').style.display = 'none';
            document.getElementById('deleteAnswer').style.display = 'none';
            document.getElementById('addImageAnswer').style.display = 'none';
            // making text tools visible
            // elems = document.getElementsByClassName('tool-text-invisible');
            
            // for (var i in elems) {
            //     if (elems.hasOwnProperty(i)) {
            //         elems[i].className = 'tool-text-visible';
            //     }
            //     alert(elems.hasOwnProperty(i));
            // }

            // // making other tools invisible
            // var elems2 = document.getElementsByClassName('tool-question-visible');
            // for (var i in elems) {
            //     if (elems.hasOwnProperty(i)) {
            //         elems[i].className = 'tool-question-invisible';
            //     }
            // }

            // var elems3 = document.getElementsByClassName('tool-answer-visible');
            // for (var i in elems) {
            //     if (elems.hasOwnProperty(i)) {
            //         elems[i].className = 'tool-answer-invisible';
            //     }
            // }
            break;
        case "question":
            document.getElementById('addQuestion').style.display = 'inline';
            document.getElementById('addAnswerQuestion').style.display = 'inline';
            document.getElementById('deleteQuestion').style.display = 'inline';
            document.getElementById('addImageQuestion').style.display = 'inline';

            // textpart
            document.getElementById('bold').style.display = 'none';
            document.getElementById('italic').style.display = 'none';
            document.getElementById('underline').style.display = 'none';
            document.getElementById('textColor').style.display = 'none';
            document.getElementById('highlight').style.display = 'none';
            // answer part
            document.getElementById('addAnswerAnswer').style.display = 'none';
            document.getElementById('deleteAnswer').style.display = 'none';
            document.getElementById('addImageAnswer').style.display = 'none';
             break;
        case "answer":
            document.getElementById('addAnswerAnswer').style.display = 'inline';
            document.getElementById('deleteAnswer').style.display = 'inline';
            document.getElementById('addImageAnswer').style.display = 'inline';

            // question part
            document.getElementById('addQuestion').style.display = 'none';
            document.getElementById('addAnswerQuestion').style.display = 'none';
            document.getElementById('deleteQuestion').style.display = 'none';
            document.getElementById('addImageQuestion').style.display = 'none';
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