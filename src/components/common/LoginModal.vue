<!--
*@LoginModal
*@author niemengshi
*@date 2025/5/16 8:48
-->
<template>
  <div class="position-absolute"></div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState('auth', ['loginModalVisible']),
      visible: {
        get() {
          return this.loginModalVisible
        },
        set(value) {
          this[value ? 'showLoginModal' : 'hideLoginModal']()
        }
      }
    },
    methods: {
      ...mapActions('auth', ['showLoginModal', 'hideLoginModal']),
      handleClose() {
        this.hideLoginModal()
      }
    }
  }
</script>
<style scoped></style>
