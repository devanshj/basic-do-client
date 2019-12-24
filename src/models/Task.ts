import { Model, tProp, types, model, modelAction, onPatches, getParent } from "mobx-keystone";
import { partialPatch } from "./utils";
import TaskList from "./TaskList";

@model("basic-do/Task")
export default class Task extends Model({
	id: tProp(types.string),
	title: tProp(types.string),
	isCompleted: tProp(types.boolean)
}) {
	getRefId() {
		return this.id;
	}

	@modelAction
	setIsCompleted(value: boolean) {
		this.isCompleted = value;
	}

	@modelAction
	setTitle(value: string) {
		this.title = value;
	}

	onAttachedToRootStore() {
		onPatches(this, patches => {
			let update = partialPatch(patches) as any;
			update.hidden = update.isCompleted;
			update.status = update.isCompleted ? "completed" : "needsAction";
			delete update.isCompleted;

			gapi.client.tasks.tasks.patch({
				task: this.id,
				tasklist: (getParent(getParent(this)!) as TaskList).id,
				resource: update
			}).then()
		})
	}
}