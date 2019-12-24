import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import "./index.css"
import RootStore from "../../models/RootStore";
import { registerRootStore } from "mobx-keystone";
import Authorizer from "../Authorizer";
import AuthorisedApp from "../AuthorizedApp";

const App = observer(() => {
	let [rootStore, setRootStore] = useState(null as RootStore | null);

	useEffect(() => {
		gapi.load("client:auth2", async () => {
			await gapi.client.init({
				apiKey: process.env.REACT_APP_GAPI_API_KEY,
				clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
				discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
				scope: "https://www.googleapis.com/auth/tasks"
			});
			let rootStore = new RootStore({});
			registerRootStore(rootStore);
			setRootStore(rootStore);
		});
	}, []);


	return <>{
		rootStore?.user.isSignedIn
			? <AuthorisedApp rootStore={rootStore} />
			: <Authorizer rootStore={rootStore}/>
	}</>
});
export default App;