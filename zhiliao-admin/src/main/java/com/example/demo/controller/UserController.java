package com.example.demo.controller;

import com.example.demo.entity.Questionnaire;
import com.example.demo.entity.UserInfo;
import com.example.demo.server.UserServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/action")
public class UserController {

    private final UserServer userServer;
    @Autowired
    public UserController(UserServer userServer) {
        this.userServer = userServer;
    }

    @PostMapping(path = "/userInfo")
    public Integer UserInfoPortal(@RequestBody UserInfo userInfo){
        System.out.println(userInfo);
        Integer resultQId=userServer.setUserInfo(userInfo);
        for (Questionnaire questionnaire:userInfo.getQuestionnaire()) {
            //将获取到的自增主键载入该List<Questionnaire>集合里
            questionnaire.setqId(resultQId);
              userServer.setUserQuestionnaire(questionnaire);
        }
        System.out.println(userInfo);
        return 1;
    }

    @GetMapping(path = "/getting")
    public String hello(){
        return "hello word";
    }

}
