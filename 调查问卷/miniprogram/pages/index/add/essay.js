// pages/index/add/radio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   essayList: {
      topic: "",
      qType:"essay",//问题类型
      isUpdate:0,//是否编辑，1是，0否
      isNew:0,//是否被编辑过，1是，0否
      choices: [{
        text: "",
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   var that=this;
   var changeWenTi=wx.getStorageSync('changeWenTi')
   wx.removeStorageSync('changeWenTi')
   if(changeWenTi.isUpdate==1){
    changeWenTi.isNew=1
    changeWenTi.isUpdate=0
    that.setData({
     essayList:changeWenTi
    })
   }else{
     return;
   }
  },

  /**
   * 获取题目文本
   */
  bindTopicTap:function(e){
    var that=this;
    var essayList=that.data.essayList;
    var topic=e.detail.value;
    essayList.topic=topic
    that.setData({
     essayList:essayList
    })
  },
  /**
   * 获取选项文本内容
   */
  bindTextTap: function (e) {
    var that = this;
    var essayList=that.data.essayList;
    var choices = that.data.essayList.choices;
    choices[0].text = e.detail.value;
    essayList.choices = choices
    that.setData({
     essayList:essayList
    })
  },

  /**
   * 验证
   */
  check(){
    var that=this;
    var essayList=that.data.essayList;
    var flag=true;
    for(var i=0;i<essayList.choices.length;i++){
      if (essayList.topic==""){
        wx.showToast({
          image:"../../../images/dele.png",
          title: '题目不能为空',
          duration:2000
        })
        flag=false;
        break;
      }
     }

      return flag;  
  },
  /**
   * 确认按钮
   */
  ReturnTap:function(){
    var that=this;
    if (that.check()) {
      try{
      wx.setStorageSync('wenti', that.data.essayList)
      }catch(e){
       console.log(e)
      }
      wx.navigateBack({
        delta: 1
      })
    }
  }
})