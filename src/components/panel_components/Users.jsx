import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm, Table, Pagination, Switch, Button } from "antd";
import {
  fetchTotalUsers,
  fetchRequiredUsers,
  deleteUser,
  changeStatus,
  getUser,
} from "../../actions/UserActions";
import AddEditUser from "./AddEditUser";
import styled from "styled-components";
import { ReactComponent as Delete } from "../../assets/images/Delete.svg";
import { ReactComponent as Email } from "../../assets/images/Email.svg";

function Users() {
  const [tableInfo, setTableInfo] = useState({
    currentPage: 1,
    limit: 10,
  });

  const dispatch = useDispatch();
  const results = useSelector((state) => state);
  const total =
    results.usersReducer.totalUsers && results.usersReducer.totalUsers.length;
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text, record) => (
        <img src={record.photo} width="40" height="40" alt="logo" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div onClick={() => dispatch(getUser(record, "edit"))}>{text}</div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
      render: (text, record) => (
        <div onClick={() => dispatch(getUser(record, "edit"))}>{text}</div>
      ),
    },
    {
      title: "Registered date",
      dataIndex: "registeredDate",
      key: "registeredDate",
      sorter: (a, b) => new Date(b.registeredDate) - new Date(a.registeredDate),
      render: (text, record) => (
        <div onClick={() => dispatch(getUser(record, "edit"))}>{text}</div>
      ),
    },
    {
      title: "Last active Date",
      dataIndex: "lastActiveDate",
      key: "lastActiveDate",
      sorter: (a, b) => new Date(b.lastActiveDate) - new Date(a.lastActiveDate),
      render: (text, record) => (
        <div onClick={() => dispatch(getUser(record, "edit"))}>{text}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Email onClick={() => dispatch(getUser(record, "edit"))} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Switch
            size="small"
            onClick={(value) =>
              dispatch(
                changeStatus(
                  record,
                  value,
                  tableInfo.currentPage,
                  tableInfo.limit
                )
              )
            }
            defaultChecked={record.disabled}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            placement="left"
            onConfirm={() => {
              dispatch(
                deleteUser(record.id, tableInfo.currentPage, tableInfo.limit)
              );
            }}
            okText="Yes"
            cancelText="No"
          >
            <Delete />
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchTotalUsers());
    dispatch(fetchRequiredUsers(tableInfo.currentPage, tableInfo.limit));
  }, [dispatch]);

  return (
    <Container>
      <Upper>
        <p>
          {results.usersReducer.showForm === "edit"
            ? "Edit user"
            : results.usersReducer.showForm === "add"
            ? "New user"
            : "All users"}
        </p>
        <span></span>
        <Button
          type="primary"
          style={{ visibility: `${results.usersReducer.showForm && "hidden"}` }}
          onClick={() => dispatch(getUser({}, "add"))}
        >
          Add user
        </Button>
      </Upper>
      {results.usersReducer.showForm ? (
        <AddEditUser tableInfo={tableInfo} />
      ) : (
        <>
          {" "}
          <Table
            rowSelection="checkbox"
            columns={columns}
            pagination={false}
            dataSource={results.usersReducer.requiredUsers}
            key={columns.key}
          />
          <Changer>
            <div>
              <div>Changer</div>
              <Pagination
                total={total}
                current={tableInfo.currentPage}
                onChange={(page, pagesize) => {
                  setTableInfo((prevState) => ({
                    ...prevState,
                    currentPage: page,
                    limit: pagesize,
                  }));
                  dispatch(fetchRequiredUsers(page, pagesize));
                }}
              />
            </div>
            <Total>
              <p>
                Totoal number of users <span>{total}</span>
              </p>
            </Total>
          </Changer>
        </>
      )}
    </Container>
  );
}

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 20px 0;
  p {
    display: inline-block;
    margin: 0;
  }
  > span {
    display: inline-block;
    background-color: #e1e6ec;
    width: 78%;
    height: 2px;
    margin: 0 10px;
  }
  button {
    width: 114px;
    height: 36px;
  }
`;

const Container = styled.div`
  padding: 0 65px;
  img {
    border-radius: 50%;
  }
`;

const Changer = styled.div`
  margin: 120px 0 20px 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1590px;
  height: 120px;
  width: 100;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  > div > div {
    margin: 0 0 26px 0;
    text-align: left;
  }
  ul {
    li {
      border-radius: 3px;
    }
  }
`;
const Total = styled.div`
  display: flex;
  align-items: center;
  > p {
    margin: 0;
  }
  span {
    color: #407eff;
  }
`;
export default Users;
