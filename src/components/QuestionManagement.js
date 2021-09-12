import React, {useEffect, useState} from "react";
import axios from "../common/axios";
import {Button, Input, message, Space, Table} from "antd";

import "./QuestionManagement.css"

const {Search} = Input;

export default function QuestionManagement(props) {
    const size = 10;
    const [keyword, setKeyword] = useState();
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        suggestQuestions(keyword, page, size);
    }, [keyword, page]);

    function suggestQuestions(keyword, page, size) {
        axios
            .get("/management/questions", {
                params: {
                    keyword,
                    page: page - 1,
                    size,
                    sort: "createdAt,desc",
                },
            })
            .then(function (data) {
                let content = data.content.map(question => {
                    return {
                        ...question,
                        group: question.group.id === "default" ? {...question.group, name: "广场"} : question.group
                    }
                });
                setContent(content);
                setTotal(data.totalElements);
            })
    }

    function onChange(page) {
        setPage(page);
    }

    function onSearch(value) {
        setPage(0);
        setKeyword(value);
    }

    function closeQuestion(userId) {
        axios
            .put(`/management/question/${userId}/status`, {"status": "FROZEN"})
            .then(function (response) {
                message.success("关闭问题成功");
                suggestQuestions(keyword, page, size)
            })
    }

    function openQuestion(userId) {
        axios
            .put(`/management/question/${userId}/status`, {"status": "NORMAL"})
            .then(function (response) {
                message.success("打开问题成功");
                suggestQuestions(keyword, page, size)
            })
    }

    function deleteQuestion(userId) {
        axios
            .delete(`/management/question/${userId}/status`)
            .then(function (response) {
                message.success("删除问题成功");
                suggestQuestions(keyword, page, size)
            })
    }

    const columns = [
        {
            title: '所在圈子',
            dataIndex: ['group', 'name'],
            key: 'group',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '内容',
            dataIndex: 'description',
            ellipsis: true,
            key: 'description',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '创建者',
            dataIndex: ['creator', 'name'],
            key: 'creator',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) =>
                <Space size="middle">
                    {record.status === 'OPENED'
                        ? <Button type="primary" onClick={() => closeQuestion(record.id)}>关闭</Button>
                        : <Button type="primary" onClick={() => openQuestion(record.id)}>打开</Button>
                    }
                    <Button type="primary" danger onClick={() => deleteQuestion(record.id)}>删除</Button>
                </Space>
            ,
        },
    ];

    return (
        <div>
            <div className="question-management-header">
                <Search allowClear placeholder="标题" onSearch={onSearch} style={{width: "50%"}}/>
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
