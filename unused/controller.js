import { model, ToDo, List, toDos, lists, dataHandler } from './model.js'
import { changeListView, listView, toDoView, newListView, newToDoView, deleteListView, view } from './view.js'

// controller object initiates all objects and provides correspondence between model and view.
const controller = {
	onStart() {
		dataHandler.retrieveAll()
		newToDoView.checkTitleField()
		const controllerObjects = [changeListController, newListController, deleteListController, newToDoController]
		for (let controller of controllerObjects) {
			controller.init()
			controller.createEventListeners()
		}
		listView.display()
		toDoView.display()
		toDoController.index()
	},

	onClose() {
		model.toDos = model.toDos.filter((toDo) => !toDo.completed)
		dataHandler.saveAll()
	},

	// returns all todos that are members of the current list
	getToDos() {
		const toDos = model.toDos.filter((toDo) => toDo.membership === model.currentList.id)
		return toDos
	},

	getCurrentList() {
		return model.currentList
	},

	getLists() {
		return model.lists
	},
}

// Controls list change form (list change submission/cancellation)
const changeListController = {
	init() {
		this.changeListButton = document.getElementById('change-list-button')
		this.changeListCancel = document.getElementById('change-list-cancel')
		this.changeListSubmit = document.getElementById('change-list-submit')
		this.listChangeMenu = document.getElementById('list-change-menu')
	},

	createEventListeners() {
		this.changeListButton.addEventListener('click', () => view.toggleChangeList())
		this.changeListCancel.addEventListener('click', () => changeListView.cancel())
		this.changeListSubmit.addEventListener('click', () => this.handleSubmission())
	},

	handleSubmission() {
		this.changeList()
		changeListView.cancel()
		listView.display()
		toDoView.display()
		toDoController.index()
		lists.saveCurrentList()
	},

	changeList() {
		model.currentList = model.lists.find((list) => list.id === Number(this.listChangeMenu.value.split(' ')[0]) - 1)
	},
}

// controls new list form (submission, cancellation, and list instantiation)
const newListController = {
	init() {
		this.newListButton = document.getElementById('new-list-button')
		this.newListCancel = document.getElementById('new-list-cancel')
		this.newListSubmit = document.getElementById('new-list-submit')
		this.newListTitle = document.getElementById('new-list-title')
		this.newListDescription = document.getElementById('new-list-description').value
	},

	createEventListeners() {
		this.newListButton.addEventListener('click', () => view.toggleNewList())
		this.newListCancel.addEventListener('click', () => newListView.cancel())
		this.newListTitle.addEventListener('input', () => newListView.checkTitleField())
		this.newListSubmit.addEventListener('click', () => this.handleSubmission())
	},

	handleSubmission() {
		this.checkTitleAvailability()
		this.newList()
		listView.display()
		toDoView.display()
		toDoController.index()
		newListView.cancel()
		lists.saveLists()
		lists.saveCurrentList()
	},

	checkTitleAvailability() {
		for (let list of model.lists) {
			let i = 1
			while (this.newListTitle.value === list.title) {
				this.newListTitle.value = `${this.newListTitle.value}(${i})`
				i++
			}
		}
	},

	newList() {
		model.lists.push(new List(this.newListTitle.value, this.newListDescription))
		model.currentList = model.lists[model.lists.length - 1]
	},
}

const deleteListController = {
	init() {
		this.deleteListButton = document.getElementById('delete-list-button')
		this.deleteListForm = document.getElementById('change-list-form')
		this.deleteListCancel = document.getElementById('delete-list-cancel')
		this.deleteListSubmit = document.getElementById('delete-list-submit')
	},

	createEventListeners() {
		this.deleteListButton.addEventListener('click', () => view.toggleDeleteList())
		this.deleteListCancel.addEventListener('click', () => deleteListView.cancel())
		this.deleteListSubmit.addEventListener('click', () => this.handleSubmission())
	},

	handleSubmission() {
		this.deleteToDos()
		if (model.currentList.id !== 0) this.deleteList()
		deleteListView.cancel()
		listView.display()
		toDoView.display()
		toDoController.index()
		dataHandler.saveAll()
	},

	deleteToDos() {
		model.toDos = model.toDos.filter((toDo) => toDo.membership !== model.currentList.id)
	},

	deleteList() {
		model.lists = model.lists.filter((list) => list.id !== model.currentList.id)
		model.currentList = model.lists[0]
	},
}

const newToDoController = {
	init() {
		this.newToDoTitle = document.getElementById('new-todo-title')
		this.newToDoSubmit = document.getElementById('new-todo-submit')
		this.newToDoDueDate = document.getElementById('new-todo-due-date')
	},

	createEventListeners() {
		this.newToDoTitle.addEventListener('input', () => newToDoView.checkTitleField())
		this.newToDoSubmit.addEventListener('click', () => this.handleSubmission())
	},

	handleSubmission() {
		this.newToDo()
		newToDoView.clearFields()
		toDoView.display()
		toDoController.index()
		toDos.saveToDos()
	},

	newToDo() {
		const newToDoTitle = this.newToDoTitle.value || 'title error'
		const newToDoDueDate = this.newToDoDueDate.value || 'NA'
		const newToDO = new ToDo(newToDoTitle, model.currentList.id, newToDoDueDate)
		model.toDos.unshift(newToDO)
	},
}

// first version
const toDoController = {
	// index is essential in assigning each to-do's complete and delete button and event handlers
	index() {
		this.completeToDoIcons = document.querySelectorAll('.complete-todo-icon')
		this.deleteToDoIcons = document.querySelectorAll('.delete-todo-icon')
		this.completeToDoIcons.forEach((icon, index) =>
			icon.addEventListener('click', () => {
				this.completeToDo(index)
			})
		)
		this.deleteToDoIcons.forEach((icon, index) =>
			icon.addEventListener('dblclick', () => {
				this.deleteToDo(index)
			})
		)
	},

	completeToDo(index) {
		/**
		 * The index parameter only provides the index fot the to-dos related to the current list. In order to retrive
		 * the to-do's index relative to model.toDos, we need to match the selected to-do's id with its position in a
		 * deep copy of model.toDos. The following expression retrieves the ID of the selected to-do and uses it to find
		 * its index in model.toDos. completeToDo then changes its completion status and moves it to the top or bottom
		 * of the list (depending on its completion status).
		 **/
		const toDoIndex = model.toDos.findIndex(({ id }) => id === controller.getToDos()[index].id)
		if (!model.toDos[toDoIndex].completed) {
			model.toDos[toDoIndex].completed = true
			model.toDos.push(model.toDos.splice(toDoIndex, 1)[0])
		} else {
			model.toDos[toDoIndex].completed = false
			model.toDos.unshift(model.toDos.splice(toDoIndex, 1)[0])
		}
		toDoView.display()
		toDos.saveToDos()
		this.index()
	},

	deleteToDo(index) {
		const deletedToDoId = controller.getToDos()[index].id
		model.toDos = model.toDos.filter((toDo) => toDo.id !== deletedToDoId)
		toDoView.display()
		toDos.saveToDos()
		this.index()
	},
}

controller.onStart()

window.addEventListener('beforeunload', controller.onClose)

export { controller }