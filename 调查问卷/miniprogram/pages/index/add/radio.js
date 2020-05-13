// pages/index/add/radio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioList: {
      topic: "",
      qType:"radio",//问题类型
      isUpdate:0,//是否编辑，1是，0否
      isNew:0,//是否被编辑过，1是，0否
      choices: [{    
        text: "",
        flag: false //是否选择，默认否
      }, {
        text: "",
        flag: false
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
      radioList:changeWenTi
    })
   }else{
     return;
   }
  },
  
  /**
   *添加选项
   */
  addTap: function (e) {
    var that = this;
    var num = that.data.radioList.choices.length;
    if (num == 7) {
      wx.showToast({
        image: "../../../images/dele.png",
        title: '只支持7个选项',
        duration: 2000
      })
    } else {
      var radioList = that.data.radioList;
      var choices = that.data.radioList.choices;
      choices.push({
        id: 0,
        text: "",
        flag: false
      })
      radioList.choices = choices;
      that.setData({
        radioList: radioList
      })
    }
  },
  /**
   *删除选项
   */
  deleteTap: function (e) {
    var that = this;
    var num = that.data.radioList.choices.length;
    if (num <= 2) {
      wx.showToast({
        image: "../../../images/dele.png",
        title: '最少2个选项',
        duration: 2000
      })
    } else {
      var index = e.currentTarget.dataset.id;
      var radioList = that.data.radioList;
      var choices = that.data.radioList.choices;
      choices.splice(index, 1);
      radioList.choices = choices
      that.setData({
        radioList: radioList
      })
    }
  },
  /**
   * 获取题目文本
   */
  bindTopicTap:function(e){
    var that=this;
    var radioList=that.data.radioList;
    var topic=e.detail.value;
    radioList.topic=topic
    that.setData({
      radioList:radioList
    })
  },
  /**
   * 获取选项文本内容
   */
  bindInputTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    var radioList = that.data.radioList;
    var choices = that.data.radioList.choices;
    choices[index].text = e.detail.value;
    radioList.choices = choices
    that.setData({
      radioList: radioList
    })
  },
  /**
   * 选择项
   */
  radioChange: function (e) {
    var that = this;
    var radioList = that.data.radioList;
    var choices = that.data.radioList.choices;
    for (var i = 0; i < choices.length; i++) {
      if (i == e.detail.value) {
        choices[i].flag = true;
      } else {
        choices[i].flag = false;
      }
    }
    radioList.choices = choices;
    that.setData({
      radioList: radioList
    })
  },
  /**
   * 验证
   */
  check(){
    var that=this;
    var radioList=that.data.radioList;
    var flag=true;
    for(var i=0;i<radioList.choices.length;i++){
      if (radioList.topic==""){
        wx.showToast({
          image:"../../../images/dele.png",
          title: '题目不能为空',
          duration:2000
        })
        flag=false;
        break;
      }
      else if (radioList.choices[i].text==""){
        wx.showToast({
          image:"../../../images/dele.png",
          title: '选项'+[i+1]+'不能为空',
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
      wx.setStorageSync('wenti', that.data.radioList)
      }catch(e){
       console.log(e)
      }
      wx.navigateBack({
        delta: 1
      })
    }
  }
})