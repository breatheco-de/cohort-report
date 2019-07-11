import React from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import { Student } from "../component/student";
import GreenThumb from "../../img/greenThumb.png";
import RedThumb from "../../img/redThumb.png";

export const Home = () => {
	return (
		<Context.Consumer>
			{({ store }) => {
				return (
					<div className="container">
						cohorts search
						<div className="row">
							<div className="col-3">student name</div>
							<div className="col">student assistance</div>
						</div>
					</div>
				);
			}}
		</Context.Consumer>
	);
};
