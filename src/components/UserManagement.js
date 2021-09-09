import React, {useEffect, useState} from "react";
import axios from "../common/axios";
import {Button, message, Col, Pagination, Row, Input} from "antd";

import "./UserManagement.css"
import CreateUser from "./CreateUser";

const { Search } = Input;

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

    return (
        <div>
            <div className="user-management-header">
                <Search allowClear onSearch={onSearch} style={{ width: "50%" }}/>
                <CreateUser OnCreateUserSuccess={OnCreateUserSuccess}/>
            </div>
            {content.map((item) => (
                <div key={item.id} className="user-management-item">
                    <Row>
                        <Col span={8}>{item.name}</Col>
                        <Col span={8}>{item.email}</Col>
                        <Col span={6}>{item.createdAt}</Col>
                        <Col span={2}>
                            <Button type="primary">
                                查看详情
                            </Button>
                        </Col>
                    </Row>
                </div>
            ))}
            <Pagination
                className="pagination"
                defaultCurrent={page}
                defaultPageSize={size}
                total={total}
                onChange={onChange}
            />
        </div>
    );
}
