import { Button, Form, Input, message, Modal, Steps } from 'antd';
import React, { useState } from 'react';
import { changePass, checkPass } from '../../redux/reducer/authReducer';
import { getStore, http, TOKEN } from '../../utils/config';
import { useDispatch } from 'react-redux';

const { Step } = Steps;

const ChangPass = ({ open, setOpen }) => {
    const [current, setCurrent] = useState(0);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    
    const onClose = () => {
        setOpen(false);
        setCurrent(0);
    };
    const checkPass = async (oldPassWord) => {
        // Giả sử đây là hàm gọi API kiểm tra mật khẩu cũ
        // Trả về true nếu mật khẩu đúng, ngược lại false
        // Đây chỉ là ví dụ, bạn cần thay đổi để phù hợp với API thực tế của bạn
        const response = await fetch('http://localhost:8080/api/users/checkPass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${getStore(TOKEN)}`,
            },
            body: oldPassWord,
        });
        const result = await response.json();
        return result; // Giả sử API trả về { isValid: true/false }
    };
    const changePass = async (oldPassWord) => {
        // Giả sử đây là hàm gọi API kiểm tra mật khẩu cũ
        // Trả về true nếu mật khẩu đúng, ngược lại false
        // Đây chỉ là ví dụ, bạn cần thay đổi để phù hợp với API thực tế của bạn
        await fetch('http://localhost:8080/api/users/changePass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${getStore(TOKEN)}`,
            },
            body: oldPassWord,
        }).then(()=>{
            message.success("Thành công")
        }).catch(()=>{
            message.error("Thất bại")
        })
    };
    const next = async () => {
        try {
            const values = await form.validateFields(['oldPassWord']);
            console.log('Old Password:', values.oldPassWord); // Log giá trị của mật khẩu cũ
            const isValid = await checkPass(values.oldPassWord);
            if (isValid==1) {
                setCurrent(current + 1);
            } else {
                form.setFields([
                    {
                        name: 'oldPassWord',
                        errors: ['Mật khẩu sai!'],
                    },
                ]);
            }
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    };


    const onFinish = (values) => {
        console.log(values);
        // call api change pass
        changePass(values.passWord)
        setOpen(false);
        setCurrent(0);
    };

    return (
        <Modal width={'40%'} title={<p className='text-center'>Đổi mật khẩu</p>} visible={open} onCancel={onClose} footer={null}>
            <Steps current={current} className="mb-4">
                <Step title="Kiểm tra mật khẩu hiện tại" />
                <Step title="Đổi mật khẩu" />
            </Steps>
            <Form onFinish={onFinish} form={form}>
                {current === 0 && (
                    <div className="form-group">
                        <label className="label-register">Mật khẩu hiện tại</label>
                        <Form.Item
                            name="oldPassWord"
                            id="oldPassWord"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                            hasFeedback
                        >
                            <Input.Password className="form-control" style={{ display: "flex" }} />
                        </Form.Item>
                        <Button type="primary" onClick={next}>
                            Tiếp theo
                        </Button>
                    </div>
                )}
                {current === 1 && (
                    <>
                        <div className="form-group">
                            <label className="label-register">Mật khẩu</label>
                            <Form.Item
                                name="passWord"
                                id="passWord"
                                hasFeedback
                            >
                                <Input.Password className="form-control" style={{ display: "flex" }} />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <label className="label-register">Nhập lại mật khẩu</label>
                            <Form.Item
                                name="confirm"
                                dependencies={["passWord"]}
                                hasFeedback
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("passWord") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "Không trùng khớp!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password className="form-control" style={{ display: "flex" }} />
                            </Form.Item>
                        </div>
                        <div className="m-t-lg">
                            <ul className="list-inline d-flex align-items-center">
                                <Button
                                    onClick={() => {
                                        form.submit();
                                    }}
                                    type="primary"
                                    className="me-2"
                                >
                                    Cập nhật
                                </Button>
                            </ul>
                        </div>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default ChangPass;
