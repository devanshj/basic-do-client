import { model, Model, tProp, types, rootRef, detach, modelAction, onPatches } from "mobx-keystone";
import { partialPatch } from "./utils";
import Task from "./Task";

@model("basic-do/TaskList")
export default class TaskList extends Model({
	id: tProp(types.string),
	title: tProp(types.string),
	tasks: tProp(
		types.maybe(
			types.array(
				types.model<Task>(Task)
			)
		)
	)
}) {
	getRefId() {
		return this.id;
	}

	@modelAction
	setTitle(value: string) {
		this.title = value;
	}

	@modelAction
	setTasks(tasks: Task[]) {
		this.tasks = tasks;
	}


	loadTasks() {
		gapi.client.tasks.tasks.list({
			tasklist: this.id,
			showCompleted: true,
			showHidden: true
		}).then(tasks => {
			this.setTasks(
				(tasks.result.items || []).map(t => new Task({
					id: t.id!,
					title: t.title || "",
					isCompleted: t.status === "completed"
				})
			))
		})
	}

	
	onAttachedToRootStore() {
		onPatches(this, patches => {
			let partialUpdate = partialPatch(patches);
			if (!("title" in partialUpdate)) return;
			gapi.client.tasks.tasklists.patch({
				tasklist: this.id,
				resource: partialUpdate
			})
		})
	}
	
}

export const taskListRef = rootRef<TaskList>("basic-do/TaskListRef", {
	onResolvedValueChange(ref, newTaskList, oldTaskList) {
		if (oldTaskList && !newTaskList) {
			detach(ref)
		}
	}
})