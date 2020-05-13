// pages/index/add/radio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gapList: {
      topic: "",
      qType:"gap",//问题类型
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
      gapList:changeWenTi
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
    var num = that.data.gapList.choices.length;
    if (num == 7) {
      wx.showToast({
        image: "../../../images/dele.png",
        title: '只支持7个选项',
        duration: 2000
      })
    } else {
      var gapList = that.data.gapList;
      var choices = that.data.gapList.choices;
      choices.push({
        id: 0,
        text: "",
      })
      gapList.choices = choices;
      that.setData({
        gapList: gapList
      })
    }
  },
  /**
   *删除选项
   */
  deleteTap: function (e) {
    var that = this;
    var num = that.data.gapList.choices.length;
    if (num <= 2) {
      wx.showToast({
        image: "../../../images/dele.png",
        title: '最少2个选项',
        duration: 2000
      })
    } else {
      var index = e.currentTarget.dataset.id;
      var gapList = that.data.gapList;
      var choices = that.data.gapList.choices;
      choices.splice(index, 1);
      gapList.choices = choices
      that.setData({
        gapList: gapList
      })
    }
  },
  /**
   * 获取题目文本
   */
  bindTopicTap:function(e){
    var that=this;
    var gapList=that.data.gapList;
    var topic=e.detail.value;
    gapList.topic=topic
    that.setData({
      gapList:gapList
    })
  },
  /**
   * 获取选项文本内容
   */
  bindInputTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    var gapList = that.data.gapList;
    var choices = that.data.gapList.choices;
    choices[index].text = e.detail.value;
    gapList.choices = choices
    that.setData({
      gapList: gapList
    })
  },

  /**
   * 验证
   */
  check(){
    var that=this;
    var gapList=that.data.gapList;
    var flag=true;
    for(var i=0;i<gapList.choices.length;i++){
      if (gapList.topic==""){
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
      wx.setStorageSync('wenti', that.data.gapList)
      }catch(e){
       console.log(e)
      }
      wx.navigateBack({
        delta: 1
      })
    }
  }
})