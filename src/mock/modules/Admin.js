const Mock = require('mockjs')


Mock.mock('/mock/admin/information/getAllAdminByPage', {
  code: '200',
  message: 'read success',
  data: {
    "list|5": [
      {
        "id": "@id", // 角色id
        "username": "@cname(4,6)", // 角色名
        "email": "@email", // 角色描述
        "lastLoginTime": "@date @time", // 使用这个角色的管理员数
        "role": "超级管理员"
      }
    ]
  }
})

Mock.mock('/mock/admin/role/getAllRoleByPage', {
  code: '200',
  message: 'read success',
  data: {
    "records|5": [
      {
        "id": "@id", // 角色id
        "name": "@cname(4,6)", // 角色名
        "desc": "@cparagraph(2)", // 角色描述
        "count": "@integer(0, 5)" // 使用这个角色的管理员数
      }
    ]
  }
})

// 权限 
Mock.mock('/mock/admin/authority', {
  code: '200',
  message: 'read success',
  data: {
    "list|5": [
      {
        "id": "@id", // 权限id
        "pid": "@id",
        "name": "@cword(4, 7)", // 权限名
        "type": 1,
        "permissionValue": null,
        "path": '/order',
        "component": "Layout",
        "icon": null,
        "status": null,
        "level": 1,
        "children|3": [
          {
            "id": "@id", // 权限id
            "pid": "@id",
            "name": "@cword(4, 7)", // 权限名
            "type": 1,
            "permissionValue": null,
            "path": '/order',
            "component": "Layout",
            "icon": null,
            "status": null,
            "level": 2,
          }
        ]
      }
    ]
  }
})