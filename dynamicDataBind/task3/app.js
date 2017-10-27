/**
 * Created by liujuping on 17/10/26.
 */


function update () {
  let app2 = new Observer({
    name: {
      firstName: 'shaofeng',
      lastName: 'liang'
    },
    age: 25
  });

  app2.$watch('name', function () {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
  });

  app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
  app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
}

update()
