<template>
  <router-view />
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'App',

    async beforeMount () {
      console.log('loading config')
      await this.loadConfig()
    },

    methods: {
      ...mapActions({ loadConfig: 'config/load' }),
    },
  }
</script>
