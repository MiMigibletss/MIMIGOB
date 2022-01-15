import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../Common/_actions/user_actions";
import { useDispatch } from "react-redux";
import getPrivateKey from "../../Common/components/keygenerator";
import getPublicKey from "../../Common/components/keygenerator1";

import { Form, Input, Button } from "antd";

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

function RegisterPage(props) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        public: getPublicKey(),
        private: getPrivateKey(),
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
   
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("이메일 형식으로 작성해주세요.")
          .required("이메일을 써주세요."),
        name: Yup.string().required("이름을 작성해주세요."),
        password: Yup.string()
          .min(6, "비밀번호는 6자리 이상입니다.")
          .required("비밀번호를 써주세요."),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
          .required("비밀번호확인을 위해 한번더 작성바랍니다."),
        public: Yup.string().required(""),
        private: Yup.string().required(""),
        // address: Yup.string().required("주소를 적으렴"),
        // gender: Yup.string().required("네 성별이 뭐니?"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            name: values.name,
            password: values.password,
            public: values.public,
            private: values.private,
            db: true, // MySQL
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              // dispatch(registerMysql(dataToSubmit))
              //   .then(response => {
              //     if (response.payload.success) {
              //       window.location.replace("/sns");
              //     }
              //     else {
              //       alert(response.payload.err)
              //     }
              //   })
            } else {
              alert(response.payload.err);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <Form
              className="input-group input-group mb-3"
              // style={{ minWidth: "375px" }}
              // {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item
              // required label="이름"
              >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    이름
                  </span>
                  <Input
                    id="name"
                    placeholder="이름을 입력하세요."
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name
                        ? "text-input error"
                        : "text-input"
                    }
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  {errors.name && touched.name ? (
                    <div className="input-feedback">{errors.name}</div>
                  ) : (
                    <div className="input-feedback"></div>
                  )}
                </div>
              </Form.Item>
              <br />

              <Form.Item
                required
                // label="이메일"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    이메일
                  </span>
                  <Input
                    id="email"
                    placeholder="이메일을 입력하세요."
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  {errors.email && touched.email ? (
                    <div className="input-feedback">{errors.email}</div>
                  ) : (
                    <div className="input-feedback"></div>
                  )}
                </div>
              </Form.Item>

              <Form.Item
                required
                // label="비밀번호"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    비밀번호
                  </span>
                  <Input
                    id="password"
                    placeholder="비밀번호를 입력하세요."
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  {errors.password && touched.password ? (
                    <div className="input-feedback">{errors.password}</div>
                  ) : (
                    <div className="input-feedback"></div>
                  )}
                </div>
              </Form.Item>

              <Form.Item
                // required label="비밀번호 확인"
                hasFeedback
              >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    비밀번호확인
                  </span>
                  <Input
                    id="confirmPassword"
                    placeholder="비밀번호 확인을 위해 한 번 더 입력하세요."
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "text-input error"
                        : "text-input"
                    }
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="input-feedback">
                      {errors.confirmPassword}
                    </div>
                  ) : (
                    <div className="input-feedback"></div>
                  )}
                </div>
              </Form.Item>

              <Form.Item
              // required label="publicKey"
              >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                  퍼블릭 주소
                  </span>
                  <Input
                    id="public"
                    type="text"
                    value={values.public}
                    readOnly
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.public && touched.public
                        ? "text-input error"
                        : "text-input"
                    }
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  {errors.public && touched.public ? (
                    <div className="input-feedback">{errors.public}</div>
                  ) : (
                    <div className="input-feedback"></div>
                  )}
                </div>
              </Form.Item>

              <Form.Item
              // required label="privateKey"
              >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    프라이빗 키
                  </span>
                  <Input
                    id="private"
                    type="text"
                    value={values.private}
                    readOnly
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.private && touched.private
                        ? "text-input error"
                        : "text-input"
                    }
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  {errors.private && touched.private ? (
                    <div className="input-feedback">{errors.private}</div>
                  ) : (
                    <div className="input-feedback"></div>
                  )}
                </div>
              </Form.Item>

           

              <Form.Item
            
              >
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
