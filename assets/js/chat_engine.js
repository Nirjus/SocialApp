
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox= $(`.${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect("http://54.163.44.39:5000");
        if(this.userEmail){
            this.connectionHandler();// connection handeler called from here
        }
    }

    connectionHandler(){

        let self = this;
        this.socket.on("connect",function(){
            console.log("connection established using socket.....!");
      
       self.socket.emit("join_room",{
        user_email:self.userEmail,
        chatroom:"chat-mate"
       });

       self.socket.on("user_joined",function(data){
console.log("a user Joined",data);
       })
      
        });

        $("#submit-butn").click(function(){
            let msg = $("#text-area").val();

            if(msg != ""){
                self.socket.emit("send_message",{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:"chat-mate",
                })
            }
        })

        self.socket.on("reseive_message",function(data){
            console.log("message resceived",data.message);

            let newMessage = $("<li>");

            let messageTYpe = "sender-text";
            if(data.user_email == self.userEmail){
                messageTYpe = "resever-text";
            }

            newMessage.append($("<span>",{
                "html":data.message
            }));
            newMessage.append($("<br>"));
            newMessage.append($("<sub>",{
                "html":data.user_email
            }));
            newMessage.addClass(messageTYpe);
            $("#chat-messages-list").append(newMessage);
        })
    }
}