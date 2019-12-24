import { Model, tProp, types, modelAction, model } from "mobx-keystone";

@model("basic-do/User")
export default class User extends Model({
	isSignedIn: tProp(types.boolean, false)
}) {

	onAttachedToRootStore() {
		this.setSignedIn(
			gapi.auth2.getAuthInstance()
			.currentUser
			.get()
			.isSignedIn()
		);

		gapi.auth2.getAuthInstance()
		.currentUser
		.listen(user => {
			this.setSignedIn(user.isSignedIn());
		});
	}

	@modelAction
	private setSignedIn(value: boolean) {
		this.isSignedIn = value;
	}

	@modelAction
	signIn() {
		gapi.auth2.getAuthInstance().signIn();
	}

	@modelAction
	signOut() {
		gapi.auth2.getAuthInstance().signOut();
	}
}