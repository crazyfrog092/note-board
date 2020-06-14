import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// error: null,
		notes: {},
		noteInfo: {}
	},
	mutations: {
		// setError(state, error) {
		// 	state.error = error
		// },
		// clearError(state) {
		// 	state.error = null
		// },
		setNotes(state, notes) {
			state.notes = notes
		},
		setNoteInfo(state, note) {
			state.noteInfo = note
		}
	},
	getters: {
		// error: s => s.error,
		notes: s => s.notes,
		noteInfo: s => s.noteInfo
	},
	actions: {
		async fetchNotes({dispatch, commit}) {
			try {
				const notes = (await firebase.database().ref('/notes').once('value')).val()
				commit('setNotes', notes)
			} catch(e) {
				console.log(e)
			}
		},
		async saveNote({dispatch, commit}, {note, id}) {
			try {
				if (id === 'new') {
					await firebase.database().ref('/notes').push(note)
				} else {
					await firebase.database().ref(`/notes/${id}`).update(note)
				}
			} catch(e) {
				console.log(e)
			}
		},
		async delNote({dispatch, commit}, id) {
			try {
				if (id !== 'new') {
					await firebase.database().ref(`/notes/${id}`).remove()
					const notes = (await firebase.database().ref('/notes').once('value')).val()
					commit('setNotes', notes)
				}
			} catch(e) {
				console.log(e)
			}
		},
		async fetchNoteInfo({dispatch, commit}, id) {
			try {
				const note = (await firebase.database().ref(`/notes/${id}`).once('value')).val()
				if (typeof note.subnotes === 'undefined') {
					note.subnotes = []
				}
				commit('setNoteInfo', note)
			} catch(e) {
				console.log(e)
			}
		}
	}
})