import React from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	class StoreWrapper extends React.Component {
		constructor(props) {
			super(props);

			this.state = getState({
				getStore: () => this.state.store,
				setStore: updatedStore =>
					this.setState({
						store: Object.assign(this.state.store, updatedStore)
					})
			});
		}

		componentDidMount() {
			// Get all students
			const url = "https://api.breatheco.de/user/?access_token=ead2dc2fc5d1c5bcfa48b83ef1b6816034a5d575";
			fetch(url, { cache: "no-cache" })
				.then(response => response.json())
				.then(data => {
					let firstNullNull = []; // "null null"
					let togetherAllLowerOrUpper = []; // first middle and last all together, all lower or upper case
					let firstLastOneField = []; // first and last in one field, other field empty
					let moreThanTwoOneField = []; // more than 2 names in one field, other empty
					let haveNull = []; // have a null value
					let notCapitalized = []; // not capitalized

					let properName = []; // properly formated name
					let total = 0; // total amount of names

					for (let user of data.data) {
						let needsFormating = 0;
						if (user.first_name.includes("null")) {
							firstNullNull.push(user);
							needsFormating++;
						}
						if (user.first_name === null || user.last_name === null) {
							haveNull.push(user);
							needsFormating++;
						}
						let last = user.last_name;
						if (user.last_name === null) last = "";

						let arrFirstName = user.first_name.split(" ");
						let lower = 0,
							upper = 0;
						if (arrFirstName.length === 1 && last === "") {
							for (let char of user.first_name) {
								if (char === char.toUpperCase()) upper++;
								else lower++;
							}
							if ((lower > 0 && upper === 0) || (lower === 0 && upper > 0)) {
								togetherAllLowerOrUpper.push(user);
								needsFormating++;
							}
						}
						if (arrFirstName.length === 2 && last === "") {
							firstLastOneField.push(user);
							needsFormating++;
						}
						if (arrFirstName.length > 2 && last === "") {
							moreThanTwoOneField.push(user);
							needsFormating++;
						}
						let noCapName = 0;
						for (let name of arrFirstName) {
							if (
								name.charAt(0) !== name.charAt(0).toUpperCase() &&
								name.charAt(1) !== name.charAt(1).toLowerCase()
							)
								noCapName++;
						}
						if (noCapName > 0) {
							notCapitalized.push(user);
							needsFormating++;
						}
						if (needsFormating === 0) properName.push(user);

						total++;

						console.log('first_name: "null null" = ' + firstNullNull.length);
						console.log('first_name: "johndoe" or "JOHNDOE" = ' + togetherAllLowerOrUpper.length);
						console.log('first_name: "John Doe", last_name: "" = ' + firstLastOneField.length);
						console.log('first_name: "John Joe Doe", last_name: ""' + moreThanTwoOneField.length);
						console.log("Have a null value = " + haveNull.length);
						console.log("Not capitalized = " + notCapitalized.length);
						console.log("Properly formatted names = " + properName.length);
						console.log("Total names checked = " + total);
					}
				});

			// // Get all cohorts
			// const url = "https://api.breatheco.de/cohorts/?access_token=d0feed2a021a9aee7036cdc56c5bd16bca1c2603";
			// fetch(url, { cache: "no-cache" })
			// 	.then(response => response.json())
			// 	.then(data => {
			// 		this.setState(({ store }) => {
			// 			data.data.sort((a, b) => (new Date(a.kickoff_date) < new Date(b.kickoff_date) ? 1 : -1));
			// 			return { store: { ...store, cohorts: data.data } };
			// 		});
			// 	});

			// // A WAY OF SAVING TO STORE LEAVING THE OLD DATA, CREATES A NEW KEY DATA WITH THE VALUE OF DATA
			// fetch(url)
			// 	.then(response => response.json())
			// 	.then(data => {
			// 		this.setState(state => {
			// 			return { store: { ...state.store, data } };
			// 		});
			// 	});

			// // ANOTHER WAY OF SAVING TO STORE LEAVING THE OLD DATA, CREATES A NEW KEY CALLED COHORTS
			// fetch(url)
			// 	.then(response => response.json())
			// 	.then(data => {
			// 		const store = this.state.store;
			// 		this.setState({ store: { ...store, cohorts: data } });
			// 	});
		}

		render() {
			return (
				<Context.Provider value={this.state}>
					<PassedComponent {...this.props} />
				</Context.Provider>
			);
		}
	}
	return StoreWrapper;
};

export default injectContext;
