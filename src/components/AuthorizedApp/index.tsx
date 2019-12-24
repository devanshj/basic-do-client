import React from "react";
import RootStore from "../../models/RootStore";
import { observer } from "mobx-react-lite";
import { css } from "linaria";
import Editable from "../Editable";
import TaskList from "../TaskList";

const AuthorisedApp = observer(({ rootStore }: { rootStore: RootStore }) => {

	return <>{
		rootStore.taskLists !== undefined &&
		rootStore.selectedTaskListRef !== undefined && 
		<>
			<TopBar
				listName={rootStore.selectedTaskListRef.current.title}
				onListNameChange={title => rootStore.selectedTaskListRef?.current.setTitle(title)}/>
			<TaskList taskList={rootStore.selectedTaskListRef.current} />
		</>
	}</>
});
export default AuthorisedApp;

const TopBar = ({ listName, onListNameChange }: {
	listName: string,
	onListNameChange: (value: string) => void
}) =>
	<div className={css`
		display: flex;
		align-items: center;
		padding: 14px 14px 12px;
	`}>
		<Editable
			className={css`
				font-size: 18px;
				line-height: 1;
			`}
			value={listName}
			onChange={onListNameChange} />
	</div>;