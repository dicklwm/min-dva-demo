import Mock from 'mockjs';

export default {
  'GET /user': Mock.mock({
    errorCode:0,
    msg: 'success',
    "data|10-30": [
      {
        "id|+1": 1,
        "name" : '@name',
        "email": '@email',
        "status|1" : ['1','2']
      }
    ]
  })
};
