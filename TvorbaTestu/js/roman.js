

// zmena toolbaru podle vybraneho prvku
function setToolbar(selectedElementType) {
    hideClass("tool");
    showClass("allControl");
    switch (selectedElementType) {
        case "question":
            showClass("questionControl");
            break;
        case "textArea":
            showClass("subQuestionControl");
            showClass("textAreaControl");
            //document.getElementById('bold').style.display = 'inline';
            //document.getElementById('italic').style.display = 'inline';
            //document.getElementById('underline').style.display = 'inline';
            //document.getElementById('textColor').style.display = 'inline';
            //document.getElementById('highlight').style.display = 'inline';

            // answer part
            //document.getElementById('deleteAnswer').style.display = 'none';
            //document.getElementById('addImageAnswer').style.display = 'none';
            break;
        /*
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
        */
    }
    return false;
}

function hideClass(className){
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++){
    elements[i].style.display = 'none';
    }
}
function showClass(className){
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = 'inline';
    }
}