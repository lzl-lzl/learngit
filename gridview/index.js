// register the grid component
window.onload = function() {
  Vue.component('demo-grid', {
    template: '#grid-template',
    props: {
      data: Array,
      columns: Array,
      filterKey: String,
      newperson: Object
    },
    data: function() {
      var sortOrders = {}
      this.columns.forEach(function(key) {
        sortOrders[key] = 1
      })
      return {
        defaultNewOne: '',
        sortKey: '',
        sortOrders: sortOrders,
        lastdatalen: 0
      }
    },
    watch: {
      /*filterKey: function(a, b) {
          console.log('filterKey')
      },*/
      newperson: {
        handler(newValue) {　　　　　
          // console.log(newValue)
          this.defaultNewOne = JSON.parse(JSON.stringify(newValue))
        },
        deep: true
      },
      defaultNewOne: {
        handler(newValue) {
          this.$emit('on-result-change', 'val66666');
        }
        // deep: true
      }
    },
    mounted: function() {
      var data = this.data
        // console.log(data)
      data.forEach(function(element, index) {
        var totalprice = element.power * element.time
          // console.log(element)
        Vue.set(element, 'total', totalprice)
      });
      // console.log('mounted')
    },
    updated: function() {
      var data = this.data
      if (data.length == this.lastdatalen) {
        // console.log('notEqual')
        return
      }
      data.forEach(function(element, index) {
        var totalprice = element.power * element.time
        Vue.set(element, 'total', totalprice)
      });
      this.lastdatalen = data.length;
    },
    computed: {
      filteredData: function() {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var data = this.data
        if (filterKey) {
          data = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function(a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      /*capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }*/
      ToChinese: function(str) {
        var chinese = ['名字',
          '资金',
          '次数',
          '性别',
          '总金额'
        ];
        return chinese[(['name', 'power', 'time', 'sex', 'total'].indexOf(str))]
      }
    },
    methods: {
      onResultChange: function(val) {
        console.log('onResultChange')
          // this.newperson = val
      },
      addition: function() {
        var data = this.data
          /*data.push({
              name: arguments.name,
              power: arguments.fond,
              time: arguments[time],
              sex: 'male'
            })*/
        data.push(
          JSON.parse(JSON.stringify(this.newperson))
        )

        // this.$data = Object.assign(this.$data, this.defaultData);
        /* this.defaultNewOne = {
             name: 'sssa',
             power: '12',
             time: '12',
             sex: '21'
           }*/
        /*not work in vue*/
        //this.newperson = Object.assign(this.newperson, this.newperson.defaultData);
        // Array.prototype.slice.call
        // document.getElementById('search').reset();
      },
      sortBy: function(key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  })

  // bootstrap the demo
  var demo = new Vue({
    el: '#demo',
    data: {
      newPerson: {
        name: '',
        power: '',
        time: '',
        sex: ''
      },
      searchQuery: '',
      gridColumns: ['name', 'power', 'time', 'sex', 'total'],
      gridData: [{
        name: '李兆隆',
        power: 5000,
        time: 500,
        sex: 'female'
      }, {
        name: 'zhaolong Lee',
        power: 9000,
        time: 1230,
        sex: 'male'
      }, {
        name: 'Jackie Chan',
        power: 7000,
        time: 20,
        sex: 'male'
      }, {
        name: 'Jet Li',
        power: 8000,
        time: 320,
        sex: 'female'
      }]
    }
  })
}
