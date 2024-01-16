import axios from "axios";
import { Field, Formik, Form as FormikFrom } from "formik";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";

function Register() {
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

  const signupAfterSubmitProcess = async (values: any) => {
    const apiUrl = "http://localhost:4000/api/v1/user/register";
    console.log(values);

    // prepare request data
    const requestBody = values;

    // call api
    await axios.post(apiUrl, requestBody);
    alert("User created successfully !");
  };

  return (
    <>
      <Row className="mt-4 mb-4">
        <Col> </Col>
        <Col xs="6">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={signupAfterSubmitProcess}
          >
            {({ errors, touched }) => (
              <Form as={FormikFrom}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    as={Field}
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                  <Form.Text className="text-danger">
                    {errors.firstName && touched.firstName ? (
                      <p>{errors.firstName}</p>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    as={Field}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                  <Form.Text className="text-danger">
                    {errors.lastName && touched.lastName ? (
                      <p>{errors.lastName}</p>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    as={Field}
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  <Form.Text className="text-danger">
                    {errors.email && touched.email ? (
                      <p>{errors.email}</p>
                    ) : null}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    as={Field}
                    name="password"
                    type="text"
                    placeholder="Password"
                  />
                  <Form.Text className="text-danger">
                    {errors.password && touched.password ? (
                      <p>{errors.password}</p>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col> </Col>
      </Row>
    </>
  );
}

export default Register;
