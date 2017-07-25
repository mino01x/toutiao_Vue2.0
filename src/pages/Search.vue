<template>
  <div class="mySearch">
    <c-back></c-back>
  </div>
</template>
<script>
  import jsonp from 'jsonp'
  import CBack from '../components/Back.vue'

  export default {
    components: {
      CBack
    },
    created () {
      jsonp('https://m.toutiao.com/search_content/?keyword=555&from=json',
        function (err, res) {
          if (err) {
            console.log(err)
            return false
          }
          console.log(res)
        })
    }
  }
</script>
