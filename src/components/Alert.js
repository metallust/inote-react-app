import React from "react";

export default function Alert(props) {
	// console.log(props)
	return (
		<div style={{ height: "50px" }}>
			{props.alert && (
				<div className={`alert alert-${props.alert.type} py-2`} role="alert">
					<strong>{props.alert.msg}</strong>
				</div>
			)}
		</div>
	);
}
