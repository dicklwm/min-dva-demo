/** Created by Min on 2017-07-07.  */
import Mock from 'mockjs';

const userData = Mock.mock({
  'data|5': [
    {
      id: '@id',
      name: '@cname',
      email: '@email',
      'status|1': ['1', '2'],
      create_at: '@datetime',
    },
  ],
});

export default {
  'GET /user': {
    errorCode: 0,
    msg: 'success',
    data: userData.data,
  },
  'POST /add_user': (req, res) => {
    userData.data.unshift(Mock.mock({
      id: '@id',
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
      create_at: '@now',
    }));
    res.json({
      errorCode: 0,
      msg: 'success',
      data: userData.data,
    });
  },
  'POST /edit_user': (req, res) => {
    const user = userData.data.find(item => item.id === req.body.id);
    if (user) {
      for (const key in req.body) {
        user[key] = req.body[key];
      }
      res.json({
        errorCode: 0,
        msg: '更新成功',
        data: userData.data,
      });
    } else {
      res.json({
        errorCode: 1,
        msg: '不存在该用户',
      });
    }
  },
  'POST /delete_user': (req, res) => {
    const userIndex = userData.data.findIndex(item => item.id === req.body.id);
    if (userIndex >= 0) {
      userData.data.splice(userIndex, 1);
      res.json({
        errorCode: 0,
        msg: '删除成功',
        data: userData.data,
      });
    } else {
      res.json({
        errorCode: 1,
        msg: '不存在该用户',
      });
    }
  },
};
