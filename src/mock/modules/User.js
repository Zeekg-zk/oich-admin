const Mock = require('mockjs')

Mock.mock('/mock/users', {
  code: '200',
  message: 'read success',
  data: {
    "list|35": [
      {
        "id": "@id",
        "name": "@cword(3,6)",
        "email": "@email",
        "phone": "15511111111"
      }
    ]
  }
})