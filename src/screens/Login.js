import React, { useState } from "react";
import "../css/Login.css";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router";
import "antd/dist/antd.css";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isHidden,setHidden] = useState(true);
  const history = useHistory();
  const onFinish = async (values) => {
    setLoading(true);
    let response = await axios.post(
      "https://qlsc.maysoft.io/server/api/auth/login",
      { username: values.username, password: values.password }
    );
    if (response.status === 200) {
      setLoading(false);
      if (response.data.code === 200) {
        sessionStorage.setItem("accessToken", response.data.data.access_token);
        sessionStorage.setItem("tokenType", response.data.data.token_type);
        sessionStorage.setItem("expiresAt", response.data.data.expires_at);
        setHidden(true);
        history.push("/home");
      }
      else{
        setHidden(false);
      }
    }
  };
  const onFinishFail = (values, errorField) => {
    console.log(values, errorField);
  };
  return (
    <div className="container">
      <div className="header">
        <h4>Đăng nhập</h4>
      </div>
      <div className="form">
        <Form
          layout="vertical"
          name="Login"
          onFinish={onFinish}
          onFinishFailed={onFinishFail}
        >
          <Form.Item
            label="Tên đăng nhập:"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên tài khoản ",
              },
            ]}
          >
            <Input placeholder="Nhập vào tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào mật khẩu",
              },
            ]}
          >
            <Input.Password placeholder="Nhập vào mật khẩu" />
          </Form.Item>
          <Form.Item  hidden={isHidden} label="Tài khoản hoặc mật khẩu không đúng" style={{visibility:{isHidden},minHeight:0}} className="errorLabel"/>
          <Form.Item>
            <Button
              block="true"
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="registerButton">
        <h3>Chưa có tài khoản ?</h3>
        <Button block="true" size="large" type="primary" href="#">
          Đăng ký
        </Button>
      </div>
    </div>
  );
};
export default Login;
