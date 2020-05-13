const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    wentiIndex: null,
    thisWenTi: null,
    isHidden: 0,
    disabled:false,
    list: [1, 2, 3],
    scheduleList: [{
      title: "活动内容"
    }, {
      title: "问卷设置"
    }, {
      title: "题目项"
    }],
    window: 1, //是否隐藏窗口,1隐藏，0显示
    typeIndex: null, //问卷类型索引
    timeIndex: null, //问卷期限索引
    dataType: ["问卷调查", "考试专用", "数据收集"], //问卷类型数组
    dateTime: ["1日", "2日", "3日", "4日", "5日", "6日", "7日"], //问卷期限数组
    setting: {
      openid:"",//用户唯一标识
      questionName: "", //问卷名称
      questionBrief: "", //问卷简介
      userName: "", //主办方姓名
      userPhone: "", //主办方联系方式
      isPublic: 1, //是否公开
      isName: 0, //是否匿名
      isPhone: 0, //是否公开联系方式
      isTalk: 0, //是否开启留言
      dataTypeValue: "", //问卷类型值
      dateTimeValue: "", //问卷期限值
      questionnaire:[]//问卷内容
    },
    wentis: []//题目内容
  },
  /**
   * 验证是否允许通过
   */
  check() {
    var typeIndex = this.data.typeIndex;
    var timeIndex = this.data.timeIndex;
    var setting = this.data.setting
    var choice = this.data.isHidden;
    switch (choice) {
      case 0:
        if (setting.questionName == "") {
          wx.showToast({
            title: "请输入问卷名称!",
            image: "../../images/dele.png",
            duration: 2000
          })
          return false;
        }
        break;
      case 1:
        if (setting.isName == 0 && setting.userName == "") {
          wx.showToast({
            title: "请输入姓名!",
            image: "../../images/dele.png",
            duration: 2000
          })
          return false;
        } else if (setting.isPhone == 0 && setting.userPhone == "") {
          wx.showToast({
            title: "请输入联系方式!",
            image: "../../images/dele.png",
            duration: 2000
          })
          return false;
        } else if (typeIndex == null) {
          wx.showToast({
            title: "请输入问卷期限!",
            image: "../../images/dele.png",
            duration: 2000
          })
          return false;
        } else if (timeIndex == null) {
          wx.showToast({
            title: "请输入问卷类型!",
            image: "../../images/dele.png",
            duration: 2000
          })
          return false;
        }

        break;
    }
    return true;
  },
  /**
   * input，textarea 输入文本内容获取
   * @param {*} e 
   */
  bindKeyInput: function (e) {
    var attr = e.currentTarget.dataset.attr;
    var setting = this.data.setting;
    setting[`${attr}`] = e.detail.value
    this.setData({
      setting: setting
    })

  },
  /**
   * 是否公开
   */
  radiochange: function (e) {
    var that = this;
    var isPublic = e.detail.value;
    var setting = that.data.setting;
    setting.isPublic = isPublic
    that.setData({
      setting: setting
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.cloud.callFunction({
       name:'login',
       data:{},
       success:function (res) {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid=res.result.openid;
        var setting=that.data.setting;
        setting.openid=res.result.openid;
        that.setData({
         setting:setting
        })
       },
       fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
      

    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var wenti = wx.getStorageSync("wenti")
    wx.removeStorageSync('wenti')
    if (wenti=="") {
     return;
    }else if (wenti.isNew==1) {
      var wentis = this.data.wentis;
      var thisWenTiIndex=this.data.thisWenTi;
      wentis[thisWenTiIndex]=wenti;
      this.setData({
        wentis: wentis,
        window: 1
      })
    }else{  
      var wentis = this.data.wentis
      wentis.push(wenti);
      this.setData({
        wentis: wentis,
        window: 1
      })
    }
  },
  /**
   * 选题
   */
  topicTap: function (e) {
    var wentiIndex = e.target.dataset.id;
    this.setData({
      thisWenTi: wentiIndex
    })
  },
  /**
   * 弹出窗口，添加题目
   */
  addProblems: function () {
    var that = this
    that.setData({
      window: 0
    })
  },
  /**
   * 关闭窗口
   */
  close: function () {
    var that = this
    that.setData({
      window: 1
    })
  },
  /**
   * 下一步按键
   */
  nextTap: function () {
    var that = this;
    if (that.check()) {
    that.setData({
      isHidden: that.data.isHidden + 1
    })
    }
  },
  /**
   * 上一步按键
   */
  lastTap: function () {
    var that = this;
    that.setData({
      isHidden: that.data.isHidden - 1
    })
  },
  /**
   * 所有开关按钮
   * @param {*}  e.currentTarget.dataset.attr 获取携带参数字符串
   */
  changeSwitch: function (e) {
    var attr = e.currentTarget.dataset.attr
    var setting = this.data.setting;
    if (e.detail.value) {
      setting[`${attr}`] = 1
    } else {
      setting[`${attr}`] = 0
    }
    this.setData({
      setting: setting
    })
  },
  /**
   * 问卷类型选择器
   */
  changeDataType: function (e) {
    var that = this
    var setting = this.data.setting
    setting.dataTypeValue = that.data.dataType[e.detail.value]
    that.setData({
      typeIndex: e.detail.value,
      setting: setting
    })
  },
  /**
   * 时间期限选择器
   */
  changeDateTime: function (e) {
    var that = this
    var setting = this.data.setting
    setting.dateTimeValue = that.data.dateTime[e.detail.value]
    that.setData({
      timeIndex: e.detail.value,
      setting: setting
    })
  },
  /**
   * 单选题跳转页
   */
  radio: function () {
    wx.navigateTo({
      url: 'add/radio',
    })
  },
  /**
   * 多选题跳转页
   */
  checkbox: function () {
    wx.navigateTo({
      url: 'add/checkbox',
    })
  },
  /**
   * 简答题跳转页
   */
  gap: function () {
    wx.navigateTo({
      url: 'add/gap',
    })
  },
  essay: function () {
    wx.navigateTo({
      url: 'add/essay',
    })
  },
  /**
   * 编辑题目
   */
  bindUpdateTap: function (e) {
    var that =this;
    var wentiIndex=e.currentTarget.dataset.id;
    var changeWenTi=that.data.wentis[wentiIndex]
    changeWenTi.isUpdate=1;
    wx.setStorageSync('changeWenTi',changeWenTi);
    wx.navigateTo({
      url: 'add/'+changeWenTi.qType,
    })
  },
  /**
   * 题目上移
   */
  bindUpTap:function(e){
    var that=this;
    var  wentiIndex=e.currentTarget.dataset.id
    if(wentiIndex<1){
      return;
    }
    var wentis=that.data.wentis;
    var temp=wentis[wentiIndex-1];
    wentis[wentiIndex-1]=wentis[wentiIndex];
    wentis[wentiIndex]=temp;
    this.setData({
     wentis:wentis,
     thisWenTi:wentiIndex-1
    })
  },
   /**
    * 题目下移
    */
   bindDownTap:function(e){
    var that=this;
    var  wentiIndex=e.currentTarget.dataset.id
    var wentis=that.data.wentis;
    if(wentiIndex>=wentis.length-1){
      return;
    } 
    var temp=wentis[wentiIndex+1];
    wentis[wentiIndex+1]=wentis[wentiIndex];
    wentis[wentiIndex]=temp;
    this.setData({
     wentis:wentis,
     thisWenTi:wentiIndex+1
    })
   },
   /**
    * 删除题
    */
   bindDeleteTap:function(e){
     var that=this;
       wx.showModal({
         confirmColor:'skyblue',
         cancelColor: 'lightgreen',
         title:'温馨提示',
         content:'是否删除题目',   
         confirmText:'确认',
         cancelText:'取消',
         success(res){
           if (res.confirm) {
            var thisWenTi = that.data.thisWenTi;
            var wentis = that.data.wentis;
            var newthisWenTi = JSON.parse(JSON.stringify(wentis));
            newthisWenTi.splice(thisWenTi, 1);
            if (thisWenTi + 1 == wentis.length) {
              thisWenTi -= 1
            }
            that.setData({
              wentis: newthisWenTi,
              thisWenTi: thisWenTi,
            })
           }
         }
       })
      },
      lookTap:function(){
        var that=this;
        var userInfoData=that.data.setting;
        var questionnaire=that.data.wentis;
        userInfoData.questionnaire=questionnaire
        console.log(userInfoData)
        wx.request({
          url:'http://localhost:8081/action/userInfo',
          method:"POST",
          header: {
            'content-type': 'application/json' 
            },
          dataType:"json",
          data:JSON.stringify(userInfoData),
          success(res){
             var result=res.data
             if (result==1) {
               wx.showToast({
                 title: '发布成功！',
                 duration:2000
               })
             }
          },
          fail(res){
            wx.showToast({
              title:"请求错误"
            })
          }
        })
      }
})