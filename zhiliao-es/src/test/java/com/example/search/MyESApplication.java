package com.example.search;


import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


import java.net.InetAddress;


@RunWith(SpringRunner.class)
public class MyESApplication {
    public static final String IP ="127.0.0.1";
    public static final int PORT = 9300;
    public static void getConnection() throws Exception {


        // 创建client
        TransportClient client = new PreBuiltTransportClient(Settings.EMPTY)
                .addTransportAddresses(new TransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

        System.out.println("es连接成功，获取连接对象： " + client.toString());

        //client.close(); 使用完要close断开连接，释放资源
    }

    @Test
    public void contextLoads() {
        try {
            MyESApplication.getConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}