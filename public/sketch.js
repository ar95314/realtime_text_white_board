var socket;
var text = {
    text: ''
};

function setup(){
    socket = io.connect('/' || 'http://localhost:8080');
    $("#text").on("froalaEditor.keyup", function(){
        var html = $(this).froalaEditor('html.get');
        var data = {
            text: html,
            color: zz
        };
        socket.emit('text', data);
    });
    $('#text').froalaEditor({
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'subscript','fontFamily', 'fontSize', 'color','paragraphFormat', 'align', 'outdent', 'indent','insertImage', 'insertFile', 'insertHR','clearFormatting','print', 'help', 'html', '|', 'undo', 'redo'],
        
        fullPage: true
    });

    socket.on('text', handleRecievedText);
    socket.on('newUser', updateText);
}

function updateText(data){
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    editor.selection.setAtEnd(editor.$el.get(0));
    editor.selection.restore();
}

function handleRecievedText(data){
    console.log(data);
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    editor.selection.setAtEnd(editor.$el.get(0));
    editor.selection.restore();
}


