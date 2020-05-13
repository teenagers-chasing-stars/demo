package com.example.demo.entity;

public class AccessToken {
    //获得到的凭证
    private String access_token;
    //凭证有效时间
    private int expries_in =7200;
    public AccessToken(){}
    public AccessToken(String access_token,int expries_in){
        this.access_token=access_token;
        this.expries_in=expries_in;
    }


    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public int getExpries_in() {
        return expries_in;
    }

    public void setExpries_in(int expries_in) {
        this.expries_in = expries_in;
    }
}
