<template>
	<component :is="layout"></component>
</template>

<script>
import AppLayout from './components/AppLayout.vue'
export default {
	computed: {
		layout() {
			return this.$route.meta.layout
		}
	},
	components: {
		AppLayout
	},
  data() {
 	  return {

 	  }
  }
}
</script>

<style lang="scss" scoped>

</style>