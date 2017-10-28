/**
 * Created by liujuping on 17/10/26.
 */

let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    },
    school: 'bupt',
    major: 'computer'
  },
  created() {
    this.data.school = 'change scholl'
    console.debug(this.data.school)

    this.data.user.name = 'liujuping'
    this.data.user.age = 18
    console.debug('******* change user.name')
  }
});


