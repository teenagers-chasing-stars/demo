package com.example.demo.dao;

import com.example.demo.entity.Choice;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
public interface ChoiceDao {
    void setQuestionnaireRadio(List<Choice> choice);
    void setQuestionnaireCheckbox(List<Choice> choice);
    void setQuestionnaireGap(List<Choice> choice);
    void setQuestionnaireEssay(List<Choice> choice);
}
