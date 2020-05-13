package com.example.demo.entity;


import java.util.List;

public class UserInfo {
    //获取自增主键
    private Integer qId;

    //用户唯一标识
    private String openid;

    //问卷名称
    private String questionName;

    //问卷简介
    private String questionBrief;

    //主办方姓名
    private String userName;

    //主办方联系方式
    private String userPhone;

    //是否公开
    private Integer isPublic;

    //是否开启留言
    private Integer isTalk;

    //问卷类型值
    private String dataTypeValue;

    //问卷期限值
    private String dateTimeValue;

    //问卷内容
    private List<Questionnaire> questionnaire;
    public UserInfo(){}
    public UserInfo(String openid, String questionName, String questionBrief, String userName, String userPhone, Integer isPublic, Integer isTalk, String dataTypeValue, String dateTimeValue, List<Questionnaire> questionnaire) {
        this.openid = openid;
        this.questionName = questionName;
        this.questionBrief = questionBrief;
        this.userName = userName;
        this.userPhone = userPhone;
        this.isPublic = isPublic;
        this.isTalk = isTalk;
        this.dataTypeValue = dataTypeValue;
        this.dateTimeValue = dateTimeValue;
        this.questionnaire = questionnaire;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }
    public String getQuestionName() {
        return questionName;
    }

    public void setQuestionName(String questionName) {
        this.questionName = questionName;
    }

    public String getQuestionBrief() {
        return questionBrief;
    }

    public void setQuestionBrief(String questionBrief) {
        this.questionBrief = questionBrief;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public Integer getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Integer isPublic) {
        this.isPublic = isPublic;
    }

    public Integer getIsTalk() {
        return isTalk;
    }

    public void setIsTalk(Integer isTalk) {
        this.isTalk = isTalk;
    }

    public String getDataTypeValue() {
        return dataTypeValue;
    }

    public void setDataTypeValue(String dataTypeValue) {
        this.dataTypeValue = dataTypeValue;
    }

    public String getDateTimeValue() {
        return dateTimeValue;
    }

    public void setDateTimeValue(String dateTimeValue) {
        this.dateTimeValue = dateTimeValue;
    }

    public List<Questionnaire> getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(List<Questionnaire> questionnaire) {
        this.questionnaire = questionnaire;
    }

    @Override
    public String toString() {
        return this.questionName+this.questionBrief+this.userName+this.userPhone+this.isPublic+this.isTalk+this.dataTypeValue+this.dateTimeValue+this.questionnaire;
    }


    public Integer getqId() {
        return qId;
    }

    public void setqId(Integer qId) {
        this.qId = qId;
    }
}
