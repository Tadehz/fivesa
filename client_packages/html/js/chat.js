let chat =
{
	size: 0,
	container: null,
	input: null,
	enabled: false,
    active: false,
    timer: null,
    previous: []
};

function enableChatInput(enable)
{
	if(chat.active == false && enable == true)
		return;
    if (enable != (chat.input != null))
	{
        mp.invoke("focus", enable);
        if (enable)
        {
            $("#chat").css("opacity", 1);
            chat.input = $("#chat").append('<div><p class="prefix">CHAT</p><input id="chat_msg" type="text" placeholder="Įrašykite žinutę ir spauskite ENTER!" /></div>').children(":last");
            chat.input.children("input").focus();
            mp.trigger("changeChatState", true);
        }
		else
		{
            chat.input.fadeOut(0, function()
			{
                chat.input.remove();
                chat.input = null;
                mp.trigger("changeChatState", false);
            });
        }
    }
}
var chatAPI =
{
	push: (text) =>
	{
		chat.size++;
		if (chat.size >= 50)
		{
			chat.container.children(":first").remove();
        }
        chat.container.append("<li>" + text + "</li>");
        chat.container.scrollTop(9999);
        show();
        hide();
    },
	clear: () =>
	{
		chat.container.html("");
	},
	activate: (toggle) =>
	{
		if (toggle == false && (chat.input != null))
			enableChatInput(false);

		chat.active = toggle;
	},
	show: (toggle) =>
	{
		if(toggle)
			$("#chat").show();
		else
			$("#chat").hide();

		chat.active = toggle;
	}
};

let api = {"chat:push": chatAPI.push, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show}; 

for(let fn in api)
{
    mp.events.add(fn, api[fn]);
}

function hide() {
    clearTimeout(chat.timer);
    chat.timer = setTimeout(function () {
        $("#chat").css("opacity", 0.0);
		$("#chat_messages").css("overflow",'hidden');
    }, 15000);
}
function show() {
    clearTimeout(chat.timer);
    $("#chat").css("opacity", 1);
	$("#chat_messages").css("overflow",'overlay');
}
$(document).ready(function()
{
    chat.container = $("#chat ul#chat_messages");
    hide();
    $(".ui_element").show();
    $("body").keydown(function(event)
    {
        if (event.which == 84 && chat.input == null && chat.active == true) {
            enableChatInput(true);
            event.preventDefault();
            show();
        }
        else if (event.which == 13 && chat.input != null) {
            var value = chat.input.children("input").val();

            if (value.length > 0) {
                chat.previous.push(value);
                if (value[0] == "/") {
                    value = value.substr(1);

                    if (value.length > 0 && value.length <= 100)
                        mp.invoke("command", value);
                }
                else {
                    if (value.length <= 100)
                        mp.invoke("chatMessage", value);
                }
            }
            enableChatInput(false);
            hide();
            kuri = chat.previous.length
        }
        else if (event.which == 27 && chat.input != null) {
            enableChatInput(false);
            hide();
            kuri = chat.previous.length
        }
        else if (event.which == 38 && chat.input != null) {
            if(kuri > 0) {
                kuri--
                chat.input.children("input").val(chat.previous[kuri]);
                setTimeout(function(){ document.getElementById("chat_msg").selectionStart = document.getElementById("chat_msg").selectionEnd = 10000; }, 0);
            }
        } else if (event.which == 40 && chat.input != null) {
            if(kuri < chat.previous.length) {
                kuri++
                chat.input.children("input").val(chat.previous[kuri]);
                setTimeout(function(){ document.getElementById("chat_msg").selectionStart = document.getElementById("chat_msg").selectionEnd = 10000; }, 0);
            }
        }
    });
});