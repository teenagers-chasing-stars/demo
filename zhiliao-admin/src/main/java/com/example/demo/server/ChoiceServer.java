package com.example.demo.server;

import com.example.demo.dao.ChoiceDao;
import com.example.demo.entity.Choice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChoiceServer implements ChoiceDao {

    private final ChoiceDao choiceDao;
    @Autowired
    public ChoiceServer(ChoiceDao choiceDao) {
        this.choiceDao = choiceDao;
    }

    @Override
    public void setQuestionnaireRadio(List<Choice> choice) {
        choiceDao.setQuestionnaireRadio(choice);
    }

    @Override
    public void setQuestionnaireCheckbox(List<Choice> choice) {
        choiceDao.setQuestionnaireCheckbox(choice);
    }

    @Override
    public void setQuestionnaireGap(List<Choice> choice) {
        choiceDao.setQuestionnaireGap(choice);
    }

    @Override
    public void setQuestionnaireEssay(List<Choice> choice) {
        choiceDao.setQuestionnaireEssay(choice);
    }
}
