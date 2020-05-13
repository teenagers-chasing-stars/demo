package com.example.demo.server;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.Choice;
import com.example.demo.entity.Questionnaire;
import com.example.demo.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServer implements UserDao{

    private final UserDao userDao;

    private final ChoiceServer choiceServer;
    @Autowired
    public UserServer(UserDao userDao, ChoiceServer choiceServer) {
        this.userDao = userDao;
        this.choiceServer = choiceServer;
    }

    @Override
    public Integer setUserInfo(UserInfo userInfo) {
        userDao.setUserInfo(userInfo);
        Integer resultQId = userInfo.getqId();
        return resultQId;
    }

    @Override
    public void setUserQuestionnaire(Questionnaire questionnaire){
        userDao.setUserQuestionnaire(questionnaire);
        Integer resultPId=questionnaire.getpId();

        //  将获取到的每个自增主键载入该questionnaire中的List<Choice>集合里,判断该questionnaire的题目类型，插入相应的数据表
        for (Choice choice:questionnaire.getChoices()){
            choice.setpId(resultPId);
        }
        if (questionnaire.getqType().equals("radio")){
            choiceServer.setQuestionnaireRadio(questionnaire.getChoices());
        }
        else if (questionnaire.getqType().equals("checkbox")){
            choiceServer.setQuestionnaireCheckbox(questionnaire.getChoices());
        }
        else if (questionnaire.getqType().equals("gap")){
            choiceServer.setQuestionnaireGap(questionnaire.getChoices());
        }
        else if (questionnaire.getqType().equals("essay")){
            choiceServer.setQuestionnaireEssay(questionnaire.getChoices());
        }

    }
}

