package com.example.demo.entity;

public class Choice {
    //该题目唯一标识
    private Integer pId;

    //选项文本内容
    private String text;

    //是否正确
    private boolean flag;
    public Choice(){}
    public Choice(String text, boolean flag) {
        this.text = text;
        this.flag = flag;
    }

    public Integer getpId() {
        return pId;
    }

    public void setpId(Integer pId) {
        this.pId = pId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }


    public boolean getFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    @Override
    public String toString() {
        return this.pId+this.text+this.flag;
    }
}

