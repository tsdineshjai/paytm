import React from "react";
import styles from "./singup.module.css";
import { useFormik } from "formik";

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = `Required`;
	} else if (values.name.length < 3) {
		errors.name = `Minimum 3 characters length`;
	}
	if (!values.email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	return errors;
};

function SignUp() {
	const { values, handleSubmit, handleChange, errors } = useFormik({
		initialValues: {
			email: "",
			name: "",
		},
		validate,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	return (
		<form
			onSubmit={handleSubmit}
			className="flex border-2 justify-center flex-col gap-2 pt-3 md"
		>
			<label htmlFor="email">Email Address</label>
			<input
				id="email"
				name="email"
				type="email"
				onChange={handleChange}
				value={values.email}
				className="border-2"
			/>

			{errors.email && <div>{errors.email}</div>}

			<label htmlFor="name">Name</label>
			<input
				id="name"
				name="name"
				onChange={handleChange}
				value={values.name}
				className="border-2"
			/>

			{errors.name && <div>{errors.name}</div>}

			<button className="" type="submit">
				Submit
			</button>
		</form>
	);
}

export default SignUp;
