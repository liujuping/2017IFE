/**
 * Created by liujuping on 17/10/26.
 */


function update () {

  // 栗子1
  let obj = {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4
    }
  }

  let app1 = new Observer(obj)

  app1.data.c.e
  app1.data.c.d = 4


  // 栗子2
  let app2 = new Observer({
    name: 'youngwind',
    age: 25
  });

  app2.data.name = {
    lastName: 'liang',
    firstName: 'shaofeng'
  };

  app2.data.name.lastName;
  // 这里还需要输出 '你访问了 lastName '
  app2.data.name.firstName = 'lalala';
  // 这里还需要输出 '你设置了firstName, 新的值为 lalala'


  // 栗子3
  let app3 = new Observer({
    name: 'youngwind',
    age: 25
  });

  // 你需要实现 $watch 这个 API
  app3.$watch('age', function(age) {
    console.log(`我的年纪变了，现在已经是：${age}岁了`)
  });

  app3.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'
}

update()
