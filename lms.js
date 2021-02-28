function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

$(document).on('click','.copyButton',function(e){
    const target = $(e.target);
    const question = $(target.siblings('.qtext')[0]).text();
    let answers = [];
    $(target.siblings('.ablock').find('input:checked')).each(function(index,value){
        answers.push($($(value).siblings('label')).text());
    });
    copyToClipboard(question + "\n\n" + answers.map(function(item){
        return "---\n" + item + "\n";
    }) + "-------------------------------\n");
});
$('.formulation').prepend($('<button class="copyButton" style="background-color:blue;width : 50px;color : white">Copy</button>'));