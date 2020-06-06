
<template lang="pug">
     commentInputView(@onUpdate='onUpdate' :status='isShowCompile' @onConfirm='onConfirm' )
</template>
<script>
  export default {
 components: {
      commentInputView
    },
    props: {
      //item数据
      datas: {
        type: Array,
        default: () => {
          return [];
        }
      },
    },
    data() {
      return {
         isShowCompile: false,
      }
    },
    methods: {
       //输入内容
      onConfirm(value) {
        console.log(value);
      },
      //更新输入框的状态
      onUpdate(event) {
        this.isShowCompile = event;
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
