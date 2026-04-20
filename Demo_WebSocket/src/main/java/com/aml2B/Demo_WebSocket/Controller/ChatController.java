package com.aml2B.Demo_WebSocket.Controller;
//import org.springframework.messaging.handler.annotation.*;
//import org.springframework.stereotype.Controller;
//
//@Controller
//public class ChatController {
//
//    @MessageMapping("/chat")          // client sends here
//    @SendTo("/topic/messages")        // broadcast to all
//    public Message sendMessage(Message message) {
//        System.out.println(message.getSender()+" : "+ message.getContent());
//        return message;
//    }
//}
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

import com.aml2B.Demo_WebSocket.Model.Message;

@Controller
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    @MessageMapping("/chat")          // client sends here
    @SendTo("/topic/messages")        // broadcast to all
    public Message sendMessage(Message message) {
        log.info("[chat] {} → {}", message.getSender(), message.getContent());
        return message;
    }
}