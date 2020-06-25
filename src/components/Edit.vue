<!-- Страница редактирования/создания новой заметки -->
<template>
	<div>

		<modal v-if="showModalExit" @close="showModalExit = false">
	    <h3 slot="header">Закрыть без сохранения</h3>
	    <div slot="body">Все не сохраненные данные будут потеряны</div>
	    <div slot="footer">
	    	<button @click="cancel()" class="btn btn__warning mr-3">Закрыть</button>
				<button @click="showModalExit = false" class="btn">Вернуться</button>
	    </div>
	  </modal>

	  <modal v-if="showModalDel" @close="showModalDel = false">
	    <h3 slot="header">Удаление заметки</h3>
	    <div slot="body">Вы действительно хотите удалить эту заметку?</div>
	    <div slot="footer">
	    	<button @click="delNote(noteKey)" class="btn btn__danger mr-3">Удалить</button>
				<button @click="showModalDel = false" class="btn">Отмена</button>
	    </div>
	  </modal>

		<div class="mb-3 ml-1 ml-md-3">
			<h1>Редактирование</h1>
		</div>
		<div class="note-edit-box">
			<div class="note-item-box">
				<label class="mr-2 mr-md-3" for="note-name">Заголовок:</label>
				<input class="ml-0 mr-2 mr-md-3" v-model.lazy="noteData.header" type="text" id="note-name">
				<button @click="showModalDel = true" class="xs-mt-2 btn btn__danger">Удалить заметку<i class="ml-1 las la-trash"></i></button>
			</div>
			<div class="note-item-box">
				<div for="note-name">Пункты:</div>
				<button @click="addSubnote()" class="ml-2 ml-sm-3 btn">Добавить<i class="ml-1 las la-plus"></i></button>
				<button @click="historyBack()" class="ml-2 ml-sm-3 btn btn-mini"><i class="las la-undo-alt"></i></button>
				<button @click="historyNext()" class="ml-1 btn btn-mini"><i class="las la-redo-alt"></i></button>
			</div>
			
			<div v-for="(subnote, index) in noteData.subnotes" :key="index" class="note-item-box">
				<label class="control">
			    <input v-model="subnote.checked" type="checkbox">
			    <div class="checkbox"><i class="check las la-check"></i><i class="notcheck las la-times"></i></div>
				</label>
				<input v-model.lazy="subnote.name" type="text">
				<button @click="delSubnote(index)" class="btn btn__danger btn-mini"><i class="las la-trash"></i></button>
			</div>

			<div class="note-item-box">
				<button @click="saveNote()" class="btn btn__success mr-3">Сохранить<i class="ml-1 las la-check"></i></button>
				<button @click="showModalExit = true" class="btn btn__warning">Отмена<i class="ml-1 las la-times"></i></button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	async mounted() {
		if (this.noteKey !== 'new') {
			await this.$store.dispatch('fetchNoteInfo', this.noteKey)
			this.noteData = this.$store.getters.noteInfo
		}
		this.history.push(JSON.stringify(this.noteData))
		// this.historyIter++
	},
	computed: {
		// error() {
		// 	return this.$store.getters.error
		// }
		historyLength: function() {
			return this.history.length - 1
		}
	},
	watch: {
		noteData: {
			handler: function() {
				if (this.historyIter === this.historyLength && !this.checkLast) {
					this.history.push(JSON.stringify(this.noteData))
					this.historyIter++
				}
				this.checkLast = false
				if (this.history[this.historyIter] !== JSON.stringify(this.noteData)) {
					this.history.splice(this.historyIter + 1)
					this.history.push(JSON.stringify(this.noteData))
					this.historyIter++
				}
      },
      deep: true
		}
		// error(fbError) {
		// 	console.log(fbError)
		// }
	},
	methods: {
		historyBack() {
			if (this.historyIter > 0) {
				this.historyIter--
				this.noteData = JSON.parse(this.history[this.historyIter])
			}
		},
		historyNext() {
			if (this.historyIter < this.historyLength) {
				this.historyIter++
				this.noteData = JSON.parse(this.history[this.historyIter])
				if (this.historyIter === this.historyLength) {
					this.checkLast = true
				}
			}
		},
		addSubnote() {
			this.noteData.subnotes.push({
				name: '',
				checked: false
			})
		},
		delSubnote(index) {
			this.noteData.subnotes.splice(index, 1)
		},
		saveNote() {
			this.$store.dispatch('saveNote', {note: this.noteData, id: this.noteKey})
			this.$router.push({name: 'main'})
		},
		delNote(id) {
			this.$store.dispatch('delNote', id)
			this.$router.push({name: 'main'})
		},
		cancel() {
			this.$router.push({name: 'main'})
		}
	},
	// props: ["delNote"],
  data: function () {
 	  return {
 	  	showModalExit: false,
 	  	showModalDel: false,
 	  	noteKey: this.$route.params.id,
 	  	noteData: {
 	  		header: '',
 	  		subnotes: []
 	  	},
 	  	history: [],
 	  	historyIter: 0,
 	  	checkLast: false
 	  }
  }
}
</script>

<style lang="scss" scoped>

</style>