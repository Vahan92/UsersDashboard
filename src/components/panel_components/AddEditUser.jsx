import React from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../../actions/UserActions";
import PropTypes from "prop-types";
import axios from "axios";

function User(props) {
  const dispatch = useDispatch();
  const results = useSelector((state) => state);
  const edit = results.usersReducer.editUserInfo.id;

  const imgUrl = (postData) => {
    const data = new FormData();
    data.append("file", postData.file);
    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
      },
    };
    axios
      .post(
        `https://brainstorm-interview-task.herokuapp.com/images`,
        data,
        config
      )
      .then((res) => {
        console.log(`res `, res);
        postData.onSuccess(res.data, postData.file);
      })
      .catch((err) => {
        console.log(`err `, err);
      });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values) => {
    if (edit) {
      values.id = results.usersReducer.editUserInfo.id;
      dispatch(
        editUser(values, props.tableInfo.currentPage, props.tableInfo.limit)
      );
    } else {
      dispatch(
        addUser(values, props.tableInfo.currentPage, props.tableInfo.limit)
      );
    }
  };

  return (
    <FormWrapper>
      <Form
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
          ["name"]: edit ? results.usersReducer.editUserInfo.name : "User name",
          ["email"]: edit ? results.usersReducer.editUserInfo.email : "Email",
          ["location"]: edit
            ? results.usersReducer.editUserInfo.location
            : "Location",
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          required
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" type="file" customRequest={(img) => imgUrl(img)}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="location"
          rules={[
            {
              required: true,
              message: "Please input your Location!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  border: 1px solid #e9e9e9;
  max-width: 1141px;
  height: 611px;
  margin: 35px 45px;
  padding: 45px;
  form {
    max-width: 400px;
    input {
      width: 100%auto;
    }
  }
`;

User.propTypes = {
  tableInfo: PropTypes.object,
};

export default User;
