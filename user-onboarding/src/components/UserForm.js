import React, { useState } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values }) => {
    return (
        <div className="UserForm">
            <Form>
                <Field name="name" type="text" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>)}

                <Field name="email" type='text' placeholder="Email" />
                {touched.email && errors.email &&
                    <p className="error">{errors.email}</p>}

                <Field name="password" type='password' placeholder="Password" />
                {touched.password && errors.password &&
                    <p className="error">{errors.password}</p>}

                <label className="checkbox-container">
                    Terms and Conditions
                  <Field
                        type="checkbox"
                        name='terms'
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>
                <button>Submit!</button>
            </Form>
        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        terms: terms || false,
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      terms: Yup.boolean().required()
    }),
    handleSubmit(values, { setStatus }) {
      axios
        .post("<https://reqres.in/api/users/>", values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm); 


export default FormikUserForm;