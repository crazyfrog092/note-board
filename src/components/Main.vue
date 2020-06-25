<!-- Главная страница -->
<template>
	<div>
		<div class="main-header mb-2 ml-1 ml-md-3">
			<h1 class="mr-3 mb-1">Доска заметок</h1>
			<router-link 
				:to="{name: 'edit', params: {id: 'new'}}"
				tag="div"
				class="h-100 mb-1">
				<button class="btn btn-add">Добавить<i class="ml-1 las la-plus"></i></button>
			</router-link>
		</div>
		<notelist-component/>
	</div>
</template>

<script>
export default {
  data() {
 	  return {

 	  }
  }
}
</script>

<style lang="scss" scoped>

</style>