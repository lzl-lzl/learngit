// demo data
window.onload = function() {
  var data = {
    name: 'My Tree',
    children: [{
      name: 'hello'
    }, {
      name: '李兆隆'
    }, {
      name: 'child folder',
      children: [{
        name: 'child folder',
        children: [{
          name: 'hello'
        }, {
          name: 'wat'
        }]
      }, {
        name: 'hello'
      }, {
        name: 'wat'
      }, {
        name: 'child folder',
        children: [{
          name: 'hello'
        }, {
          name: 'wat'
        }]
      }]
    }]
  }

  // define the item component
  Vue.component('item', {
    template: '#item-template',
    props: {
      model: Object
    },
    data: function() {
      return {
        open: false
      }
    },
    mounted: function() {
      /* demo.$on('emitDel', function(mod) {
         console.log(mod)
       })*/

      // console.log(this.$parent)
      // console.log('mounted')
    },
    computed: {
      isFolder: function() {
        return this.model.children &&
          this.model.children.length
      }
    },
    methods: {
      /*add lzl*/
      delItem: function() {
        console.log(this.$parent.model.children)
        console.log(this.model.name)

        var a = this.$parent.model.children
        var bname = this.model.name

        a.forEach(function(element, index) {
            if (element.name == bname) {
              console.log(index + 'index');
              a.splice(index, 1)
            }
          })
          // demo.$emit('emitDel', this.model)
      },
      toggle: function() {
        if (this.isFolder) {
          this.open = !this.open
        }

      },
      changeType: function() {
        if (!this.isFolder) {
          Vue.set(this.model, 'children', [])
          this.addChild()
          this.open = true
        }
      },
      addChild: function() {
        this.model.children.push({
          name: '新用户  ' + (this.model.children.length + 1)
        })
      }
    }
  })

  // boot up the demo
  var demo = new Vue({
      el: '#demo',
      data: {
        treeData: data
      }
    })
    /*
      demo.$on('test', function(msg) {
        console.log(msg)
      })
      demo.$emit('test', data)*/

}
