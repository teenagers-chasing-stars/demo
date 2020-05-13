// pages/index/add/chechbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkList: {
      topic: "",
      qType:"checkbox",//问题类型
      isUpdate:0,//是否编辑，1是，0否
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
  onLoad: function (options) {
   var that=this;
   var changeWenTi=wx.getStorageSync('changeWenTi')
   wx.removeStorageSync('changeWenTi')
   if(changeWenTi.isUpdate==1){
    changeWenTi.isNew=1
    changeWenTi.isUpdate=0
    that.setData({
      checkList:changeWenTi
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
    var num = that.data.checkList.choices.length;
    if (num == 7) {
      wx.showToast({
        image: "../../../images/dele.png",
        title: '只支持7个选项',
        duration: 2000
      })
    } else {
      var checkList = that.data.checkList;
      var choices = that.data.checkList.choices;
      choices.push({
        id: 0,
        text: "",
        flag: false
      })
      checkList.choices = choices;
      that.setData({
        checkList: checkList
      })
    }
  },
  /**
   *删除选项
   */
  deleteTap: function (e) {
    var that = this;
    var num = that.data.checkList.choices.length;
    if (num <= 2) {
      wx.showToast({
        image: "../../../images/dele.png",
        title: '最少2个选项',
        duration: 2000
      })
    } else {
      var index = e.currentTarget.dataset.id;
      var checkList = that.data.checkList;
      var choices = that.data.checkList.choices;
      choices.splice(index, 1);
      checkList.choices = choices
      that.setData({
        checkList: checkList
      })
    }
  },
  /**
   * 获取题目文本
   */
  bindTopicTap:function(e){
    var that=this;
    var checkList=that.data.checkList;
    var topic=e.detail.value;
    checkList.topic=topic
    that.setData({
      checkList:checkList
    })
  },
  /**
   * 获取选项文本内容
   */
  bindInputTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    var checkList = that.data.checkList;
    var choices = that.data.checkList.choices;
    choices[index].text = e.detail.value;
    checkList.choices = choices
    that.setData({
      checkList: checkList
    })
  },
  /**
   * 选择项
   */
  checkChange: function (e) {
    var that = this;
    var thisVaule=e.detail.value;
    var checkList = that.data.checkList;
    var choices = that.data.checkList.choices;
    for (var i = 0; i < choices.length; i++) { 
      if (thisVaule.indexOf("" + i) != -1) {
        choices[i].flag = true;
      } else {
        choices[i].flag = false;
      }
    }
    checkList.choices = choices;
    that.setData({
      checkList: checkList
    })
   
  },
  /**
   * 验证
   */
  check(){
    var that=this;
    var checkList=that.data.checkList;
    var flag=true;
    for(var i=0;i<checkList.choices.length;i++){
      if (checkList.topic==""){
        wx.showToast({
          image:"../../../images/dele.png",
          title: '题目不能为空',
          duration:2000
        })
        flag=false;
        break;
      }
      else if (checkList.choices[i].text==""){
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
      wx.setStorageSync('wenti', that.data.checkList)
      }catch(e){
       console.log(e)
      }
      wx.navigateBack({
        delta: 1
      })
    }
  }
})