import { model, Model, tProp, types, modelAction } from "mobx-keystone";
import User from "./User";
import TaskList, { taskListRef } from "./TaskList";
import { reaction, observable } from "mobx";

@model("basic-do/RootStore")
export default class RootStore extends Model({
	user: tProp(
		types.model<User>(User),
		() => new User({})
	),
	taskLists: tProp(
		types.maybe(
			types.array(
				types.model<TaskList>(TaskList)
			)
		)
	),
	selectedTaskListRef: tProp(
		types.maybe(
			types.ref<TaskList>()
		)
	)
}) {
	onInit() {
		reaction(() => this.user.isSignedIn, isSignedIn => {
			if (!isSignedIn) return;
			gapi.client.tasks.tasklists.list({})
			.then(taskLists => 
				(taskLists.result.items || [])
				.map(({ id, title }) => new TaskList({
					id: id!,
					title: title || ""
				}))
			)
			.then(taskLists => {
				this.setTaskLists(taskLists);
				this.selectTaskList(taskLists[1]) // DEV
			});
		})

		// @ts-ignore
		window.devOnly = this.devOnly.bind(this);
	}

	@modelAction
	devOnly(fn: (this: RootStore) => void) {
		fn.bind(this)();
	}

	@modelAction
	private setTaskLists(taskLists: TaskList[]) {
		this.taskLists = taskLists;
	}

	@modelAction
	selectTaskList(taskList: TaskList | undefined) {
		this.selectedTaskListRef = taskList ? taskListRef(taskList) : undefined;
		taskList && taskList.loadTasks();
	}

	@modelAction
	selectTaskListFromRefId(taskListRefId: ReturnType<TaskList["getRefId"]>) {
		let taskList = this.taskLists?.find(l => l.getRefId() === taskListRefId);
		this.selectTaskList(taskList);
	}
}