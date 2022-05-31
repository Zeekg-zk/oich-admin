const Mock = require('mockjs')

// 非遗项目列表
Mock.mock('/mock/projects', {
  code: '200',
  message: "read success",
  data: {
    "list|20": [
      {
        "id": '@id', // 项目id
        "level": 1, // 项目级别
        "name": '@ctitle', // 项目名
        "category": '传统音乐', // 项目类别
        "protectedUnitName": "@province",
        "publishTime": "2006(第一批)",
        "img": "@image('200x200','#50B347', '#FFF', 'Vue3')",
        "inheritors": [
          "张三",
          "李四"
        ]
      }
    ]
  }
})

// 非遗项目类别信息
Mock.mock('/mock/projects/classification', {
  code: '200',
  message: 'read success',
  data: {
    "list|6": [
      {
        "id": '@id', // 项目id
        "name": '@ctitle', // 项目名
        "description": '@cparagraph(2, 3)', // 项目类别
      }
    ]
  }
})

// 非遗传承人列表
Mock.mock('/mock/inheritor', {
  code: '200',
  message: 'read success',
  data: {
    "list|20": [
      {
        "id": "@id", // 传承人ID
        "name": "@cname", // 传承人姓名
        "family": "汉族",// 所属名族
        "location": "@province@city@county",
        "createTime": "@date",
        "connectionProject": [
          "苗歌",
          "刺绣"
        ]//相关项目
      }
    ]
  }
})

Mock.mock('/mock/region', {
  code: '200',
  message: 'read success',
  data: {
    "list|23": [
      {
        "id": "@id",
        "province": "@province",
        "city": "@city",
        "county": "@county"
      }
    ]
  }
})

// 保护单位
Mock.mock('/mock/protectedUnit', {
  code: '200',
  message: 'read success',
  data: {
    "list|5": [
      {
        "id": "@id", // 保护单位ID
        "name": "@cword(5, 8)", // 保护单位名称
        "description": "@cparagraph(2)",
      }
    ]
  }
})

// 审核规则
Mock.mock('/mock/rules', {
  code: '200',
  message: 'read success',
  data: {
    "list|5": [
      {
        "id": "@id",
        "keyword": "@cword(3, 5)",
        "createTime": "@date",
        "enable": "@boolean",
        "count": "@integer(0,999)"
      }
    ]
  }
})