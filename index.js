$(function(){
    let tasksList = $("#tasksList")
    let taskInput = $("#taskInput")
    let notification = $("#notification")

    let displayNotification = function(){
        if (!tasksList.children().length){
            notification.fadeIn("fast");
        } else{
            notification.css("display", "none")
        }
    }

    $("#taskAdd").on("click", function(){
        if (!taskInput.val()) return 

        let li = $('<li></li>')
        li.addClass('text') 
        li.html(`
            <input class ='check' type='checkbox'>
            <strong>${taskInput.val()}</strong>  
            <button class='btn2'style = 'display: none'>&#9998;</button>
            <button class='btn'>&#9998;</button> 
            <button class='delete'>&#10006</button>
        `)        
        tasksList.append(li)

        taskInput.val("");

        displayNotification();

        li.find(".check").click (function(){
            let parent = $(this).parent();
            if ($(this).is(':checked')){
                parent.css("color","gray")
                parent.find(".btn").css('display', 'none')
            } else {
                parent.css("color","black") 
                parent.find(".btn").css('display', 'inline')
            }
        })

        li.find(".btn").click (function(){
            let $this = $(this).parent();
            $this.find(".btn2").css('display', 'inline')
            $this.find(".btn").css('display', 'none')
            $this.find(".check").css('display', 'none')
            let textRedact = $this.find("strong").text()
            $this.find("strong").after(`<input class = 'redact' type='text' value = '${textRedact}'></input>`)
            $this.find("strong").text('')
            
        })

        li.find(".btn2").on("click", function(){
            let $this = $(this).parent();
            if (!$this.find(".redact").val()) {
                return false
            }
            $this.find(".btn2").css('display', 'none')
            $this.find(".btn").css('display', 'inline')
            $this.find(".check").css('display', 'inline')
            $this.find("strong").text(`${$this.find(".redact").val()}`)
            $this.find(".redact").remove()
        })
        
        li.find(".delete").on("click", function(){
            let parent = $(this).parent();

            parent.css("animation", "fadeOut .3s linear")
            
            parent.remove();

            displayNotification();   
        })
    })   
})