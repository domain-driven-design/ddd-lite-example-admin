import React, {useEffect, useState} from "react";
import axios from "../common/axios";
import {Button, Input, message, Table} from "antd";

import "./UserManagement.css"
import CreateUser from "./CreateUser";

const {Search} = Input;

export default function UserManagement(props) {

    const size = 10;
    const [keyword, setKeyword] = useState();
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        suggestUsers(keyword, page, size);
    }, [keyword, page]);

    function suggestUsers(keyword, page, size) {
        axios
            .get("/management/users", {
                params: {
                    keyword,
                    page: page - 1,
                    size,
                    sort: "createdAt,desc",
                },
            })
            .then(function (data) {
                setContent(data.content);
                setTotal(data.totalElements);
            })
            .catch(function (error) {
                message.error("获取用户管理列表失败");
            });
    }

    function onChange(page) {
        setPage(page);
    }

    function onSearch(value) {
        setPage(0);
        setKeyword(value);
    }

    function OnCreateUserSuccess() {
        setPage(0);
        setKeyword(null);
    }

    function frozenUser(userId) {
        axios
            .put(`/management/users/${userId}/status`, {"status": "FROZEN"})
            .then(function (response) {
                message.success("冻结成功");
                suggestUsers(keyword, page, size)
            })
    }

    function unFrozenUser(userId) {
        axios
            .put(`/management/users/${userId}/status`, {"status": "NORMAL"})
            .then(function (response) {
                message.success("解冻成功");
                suggestUsers(keyword, page, size)
            })
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) =>
                record.status === 'NORMAL'
                    ? <Button type="primary" onClick={() => frozenUser(record.id)}>冻结</Button>
                    : <Button type="primary" onClick={() => unFrozenUser(record.id)}>解冻</Button>
            ,
        },
    ];

    return (
        <div>
            <div className="user-management-header">
                <Search allowClear placeholder="姓名 / 邮箱" onSearch={onSearch} style={{width: "50%"}}/>
                <CreateUser OnCreateUserSuccess={OnCreateUserSuccess}/>
            </div>
            <Table
                columns={columns}
                dataSource={content}
                pagination={{
                    defaultCurrent: page,
                    defaultPageSize: size,
                    total: total,
                    onChange: onChange
                }}
                rowKey="id"
            />
        </div>
    );
}
