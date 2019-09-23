import React, { useState, useEffect } from "react";
import { createActions, initialStore } from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		const [store, _setStore] = useState(initialStore);
		const setStore = updated => {
			console.log("Updated with ", updated);
			_setStore(Object.assign(store, updated));
		};
		const getStore = () => store;
		console.log("createActions ", typeof createActions);
		const actions = createActions({ setStore, getStore });

		useEffect(() => {
			// Get all cohorts
			actions.fetchCohorts();
		}, []);

		return (
			<Context.Provider value={{ store, actions, setStore }}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
