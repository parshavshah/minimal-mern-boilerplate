import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { registerUser } from "../actions/UserAction";
import Notiflix from "notiflix";
import { Link, useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(14, "Too Long!")
    .required("Required"),
});

export default function Signup() {
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          console.log("after submit :: ", values);
          await registerUser(values);
          const a = Notiflix.Report.success(
            "Register Success!",
            "Your account has been created !",
            "Ok",
            { borderRadius: "6px" }
          );
          navigate("/login");
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <Field
                  name="firstName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <Field
                  name="lastName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Field
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Field
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <Link
                to="/login"
                className="mt-2 flex w-full justify-center rounded-md bg-white-600 px-3 py-1.5 text-sm font-semibold leading-6 #4f46e5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Already have an account ?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
