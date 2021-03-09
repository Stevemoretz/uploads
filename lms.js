
if(window.location.href.includes('/mod/quiz')){
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
        alert('Copied');
    })
    $('.formulation').prepend($('<div class="copyButton" style="background-color:blue;width : 50px;color : white;text-align : center;cursor : pointer">Copy</div>'));

    const dEndAnswer = $('<div>');
    dEndAnswer.css({'display':'flex','margin-top':'10px'});

    dEndAnswer.append($('<input class="answerBoxSm" style="background-color:grey;flex : 1;color : white"/>'))
    dEndAnswer.append($('<div class="answerButtonSM" style="background-color:grey;width : 80px;color : white;text-align : center;cursor : pointer">Answer</div>'));
    $('.formulation').append(dEndAnswer);

    $(document).on('click','.answerButtonSM',function(e){
        const target = $(e.target);
        const question = $(target.siblings('.answerBoxSm')[0]).val();
        const answers = question.split("---").filter(function(item){
            return item !== '-' && item !== '';
        }).map(function (item){
            return item.replace(/( |\s)*/gm, '');
        });

        $(target.parent().siblings('.ablock').find('input')).each(function(index,value)    {
            const sr = answers.filter(function(item){
                return item.includes($($(value).siblings('label')).text().replace(/\n/g, " ").replace(/( |\s)*/gm, ''));
            });
            $(value).prop('checked', sr.length > 0);
        });
        $(target.siblings('.answerBoxSm')[0]).val('');
    })



    const smHeaderTop = $('<div style="position : fixed;display : flex;flex-direction : row;top : 0;width : 100%;margin-top : 50px;background-color : red;z-index: 1000">');
    smHeaderTop.append($('<input id="search-sm" style="width : 100%"/>'));
    smHeaderTop.append($('<div class="findButtonSM" style="background-color:grey;width : 80px;color : white;text-align : center;cursor : pointer">Find</div>'));
    $(document.body).append(smHeaderTop);

    $(document).on('click','.findButtonSM',function(e) {
        const inputValue = $('#search-sm').val().replace(/\n/g, " ").replace(/( |\s)*/gm, '');
        const answers = inputValue.split("---").filter(function(item){
            return item !== '-' && item !== '';
        }).map(function (item){
            return item.replace(/( |\s)*/gm, '');
        });
        let done = false;
        $('.qtext').each(function(index,item){
            if(inputValue.includes($(item).text().replace(/\n/g, " ").replace(/( |\s)*/gm, ''))){
                done = true;
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(item).offset().top - 100
                }, 200);
                $($(item).siblings('.ablock').find('input')).each(function(index,value)    {
                    const sr = answers.filter(function(item){
                        return item.includes($($(value).siblings('label')).text().replace(/\n/g, " ").replace(/( |\s)*/gm, ''));
                    });
                    $(value).prop('checked', sr.length > 0);
                });
            }
        });
        if(!done){
            alert('You do not have this question!');
        }
        $('#search-sm').val('');
    });
}