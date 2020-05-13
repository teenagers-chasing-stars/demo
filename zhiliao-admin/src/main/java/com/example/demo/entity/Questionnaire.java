package com.example.demo.entity;
import java.util.List;

public class Questionnaire {

    //该问卷唯一标识
    private Integer qId;

    //获取自增主键
    private Integer pId;

    //问卷题目
    private String topic;

    //问卷类型
    private String qType;

    //该题选项
    private List<Choice> choices;
    public Questionnaire(){}
    public Questionnaire(String topic, String qType, List<Choice> choices) {
        this.topic = topic;
        this.qType = qType;
        this.choices = choices;
    }
    public Integer getqId() {
        return qId;
    }

    public void setqId(Integer qId) {
        this.qId = qId;
    }
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getqType() {
        return qType;
    }

    public void setqType(String qType) {
        this.qType = qType;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    @Override
    public String toString() {
        return this.qId+this.topic+this.qType+this.choices;
    }


    public Integer getpId() {
        return pId;
    }

    public void setpId(Integer pId) {
        this.pId = pId;
    }
}
