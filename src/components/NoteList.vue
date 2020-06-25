<!-- Компонент заметок на главной -->
<template>
	<div class="notelist-box">
	  <modal v-if="showModal" @close="showModal = false">
	    <h3 slot="header">Удаление заметки</h3>
	    <div slot="body">Вы действительно хотите удалить эту заметку?</div>
	    <div slot="footer">
	    	<button @click="delNote(noteId)" class="btn btn__danger mr-3">Удалить</button>
				<button @click="showModal = false" class="btn">Отмена</button>
	    </div>
	  </modal>
		<template v-for="(note, key) in notes">
			<div :key="key" class="note-box">
				<div class="note-header">
					<div class="mr-3">{{note.header}}</div>
					<router-link 
						:to="{name: 'edit', params: {id: key}}"
						tag="div"
						class="ml-auto h-100">
						<button class="btn btn-mini"><i class="las la-pen"></i></button>
					</router-link>
					<button @click="showDelModal(key)" class="ml-1 btn btn__danger btn-mini"><i class="las la-trash"></i></button>
				</div>
				<div class="note-list">
					<template v-for="(subnote, index) in note.subnotes">
						<div v-if="index < 3" :key="index" class="list-item">
							<div v-if="subnote.checked" class="checkbox checkbox__success"><i class="las la-check"></i></div>
							<div v-else class="checkbox"><i class="las la-times"></i></div>
							<div class="text">{{subnote.name}}</div>
						</div>
						<div v-if="index === 3" class="list-item">
							<div class="text ml-0">И еще несколько пунктов...</div>
						</div>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	async mounted() {
		await this.$store.dispatch('fetchNotes')
		this.notes = this.$store.getters.notes
	},
	methods: {
		async delNote(id) {
			await this.$store.dispatch('delNote', id)
			this.notes = this.$store.getters.notes
			this.showModal = false
		},
		showDelModal(id) {
			this.noteId = id
			this.showModal = true
		}
	},
  data() {
 	  return {
 	  	notes: {},
 	  	showModal: false,
 	  	noteId: ''
 	  }
  }
}
</script>

<style lang="scss" scoped>

</style>