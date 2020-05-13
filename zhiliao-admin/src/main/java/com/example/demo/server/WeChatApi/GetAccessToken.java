package com.example.demo.server.WeChatApi;

import com.example.demo.entity.AccessToken;
import com.google.gson.Gson;
import org.springframework.web.client.RestTemplate;

//@Service
public class GetAccessToken
{
    private static String appId = "wx462975da4f2ec919";
    private static String appSecret = "f3a957a429dafde5a0d63cffc87d7fd2";
    private RestTemplate restTemplate;
    public String AccessTokenValue() {
        restTemplate = new RestTemplate();
        // 获取access_token
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential" + "&appid=" + appId
                + "&secret=" + appSecret;
        String jsonData = restTemplate.getForObject(url, String.class);
        System.out.println(jsonData);
        AccessToken accessToken = new Gson().fromJson(jsonData, AccessToken.class);
        System.out.println(accessToken.getAccess_token());
        System.out.println(accessToken.getExpries_in());
        return jsonData;
    }
}