/** Created by Min on 2017-07-07.  */
import Mock from 'mockjs';
import moment from 'moment';

const userData = Mock.mock({
  'data|10-30': [
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
  'GET /user': (req, res) => {
    const { keyword, start_date, end_date, status } = req.query;
    let data = userData.data;
    if (keyword) {
      data = data.filter(item =>
      (item.name.toLocaleUpperCase().search(keyword.toLocaleUpperCase()) >= 0) ||
      (item.email.toLocaleUpperCase().search(keyword.toLocaleUpperCase()) >= 0),
      );
    }
    if (start_date && end_date) {
      data = data.filter(item => moment(item.create_at).isBetween(start_date, end_date));
    }
    if (status) {
      data = data.filter(item => item.status === `${status}`);
    }
    res.json({
      errorCode: 0,
      msg: 'success',
      data,
      total: data.length,
    });
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
