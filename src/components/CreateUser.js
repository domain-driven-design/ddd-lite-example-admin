import React from "react";
import {Button, Form, Input, message, Modal} from "antd";
import axios from "../common/axios";


export default function CreateUser(props) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            setConfirmLoading(true);

            axios
                .post(`/management/users`, values)
                .then(function (response) {
                    message.success("创建成功");
                    setConfirmLoading(false);
                    setVisible(false);
                    form.resetFields();
                    props.OnCreateUserSuccess && props.OnCreateUserSuccess();
                })
                .catch(function (error) {
                    setConfirmLoading(false);
                    setVisible(false);
                });
        })


    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                创建用户
            </Button>
            <Modal
                title="创建用户"
                visible={visible}
                onOk={handleOk}
                okText="确认"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="取消"
            >
                <Form form={form}>
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "姓名必填",
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "邮箱必填",
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "密码必填",
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
