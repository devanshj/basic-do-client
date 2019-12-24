import React from "react";
import TaskListModel from "../../models/TaskList";
import Editable from "../Editable";
import { observer } from "mobx-react-lite";
import { css } from "linaria";
import TaskModel from "../../models/Task";

const TaskList = observer(({ taskList }: { taskList: TaskListModel }) => {
	return <div className={css`padding: 0 14px;`}>{
		taskList.tasks && 
		taskList.tasks.map(task => <Task key={task.id} task={task}/>)
	}</div>;
});
export default TaskList;

const Task = observer(({ task }: { task: TaskModel }) => 
	<div key={task.id} className={css`
		margin-bottom: 8px;

		display: flex;
		align-items: baseline;
		position: relative;
	`}>
		<input
			type="checkbox"
			checked={task.isCompleted}
			onChange={e => task.setIsCompleted(e.target.checked)}
			className={css`
				flex-shrink: 0;
				position: relative;
				top: 1px;
				width: 14px;
				height: 14px;
				
				appearance: none;
				-webkit-appearance: none;
				border: 1px solid hsl(0, 0%, 70%);
				border-radius: 2px;
				cursor: pointer;

				& ~ svg {
					position: absolute;
					left: 2px;
					top: 0px;
					width: 14px;
					height: auto;
					
					color: transparent;
					pointer-events: none;
				}
				
				&:checked ~ svg {
					color: hsl(0, 0%, 60%);
				}

				&:checked ~ div {
					color: hsl(0, 0%, 60%);
					text-decoration: line-through;
				}
				
				&:hover {
					background-color: hsl(0, 0%, 90%);
				}
			`}/>
		<svg viewBox="0 0 14 12">
			<path fill="currentColor" strokeWidth="1px" d="M4.959 9.263l6.792-8.015a.71.71 0 0 1 .995-.082c.3.249.34.69.09.984l-7.29 8.602a.706.706 0 0 1-.708.228.706.706 0 0 1-.483-.248L1.165 6.97a.694.694 0 0 1 .09-.987.712.712 0 0 1 .996.085l2.708 3.195z"></path>
		</svg>
		<Editable
			value={task.title}
			onChange={t => task.setTitle(t)}
			className={css`
				margin-left: 7px;
				line-height: 1;
			`}/>
	</div>);