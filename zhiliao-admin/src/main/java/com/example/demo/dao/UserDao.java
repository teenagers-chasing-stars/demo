package com.example.demo.dao;

import com.example.demo.entity.Questionnaire;
import com.example.demo.entity.UserInfo;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {
    Integer setUserInfo(UserInfo userInfo);
    void setUserQuestionnaire(Questionnaire questionnaire);
}
