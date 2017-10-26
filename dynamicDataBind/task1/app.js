/**
 * Created by liujuping on 17/10/26.
 */


function update () {
  let app1 = new Observer({
    name: 'youngwind',
    age: 25
  });

  let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
  });

  /*
   传入参数只考虑对象，不考虑数组。
   new Observer返回一个对象，其 data 属性要能够访问到传递进去的对象。
   通过 data 访问属性和设置属性的时候，均能打印出右侧对应的信息。
   */

  // 要实现的结果如下：
  app1.data.name               // 你访问了 name
  app1.data.age = 100;          // 你设置了 age，新的值为100
  app2.data.university         // 你访问了 university
  app2.data.major = 'science'  // 你设置了 major，新的值为 science
}

update()
