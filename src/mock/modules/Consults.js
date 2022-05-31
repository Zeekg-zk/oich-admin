const Mock = require('mockjs')

Mock.mock('/mock/news', {
  code: '200',
  message: 'read success',
  data: {
    "list|5": [
      {
        "id": "@id", 
        "title": "@cword(3,6)",
        "createTime": "@date", 
        "count": "@integer(0, 999)",
        "commentCount": "@integer(0, 99)",
        "link": "@url",
      }
    ]
  }
})

Mock.mock('/mock/notices', {
  code: '200',
  message: 'read success',
  data: {
    "list|8": [
      {
        "id": "@id",
        "name": "@cword(3,6)",
        "enable": "@boolean",
      }
    ]
  }
})