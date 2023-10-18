import React, {useEffect, useState} from 'react';
import {Modal, Flex, Text, PinInput} from '@mantine/core';

interface AuthenticationModalProps {
    // 开关状态
    opened: boolean;
    // 是否显示关闭按钮
    withCloseButton: boolean;
    // 标题
    title: string;
    // 输入长度
    length: number;
    // 当输入字符达到设定长度后调用
    onCodeEntered: (code: string) => void
    // 关闭调用
    onClose: () => void
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
                                                                     opened,
                                                                     withCloseButton,
                                                                     title,
                                                                     length,
                                                                     onCodeEntered,
                                                                     onClose
                                                                 }) => {

    const [code, setCode] = useState<string>('')

    const fnClose = () => {
        setCode('')
        onClose()
    }

    useEffect(() => {
        if (code.length === length) {
            onCodeEntered(code)
        }
    }, [code])

    return (
        <Modal
            centered
            opened={opened}
            onClose={fnClose}
            withCloseButton={withCloseButton}
            overlayProps={{
                blur: 3,
            }}
        >
            <Flex justify="center" align="center" direction="column" pb={20} gap="xl">
                <Text fw={700} size="xl">
                    {title}
                </Text>
                <PinInput
                    autoFocus
                    size="xl"
                    length={length}
                    type="number"
                    placeholder=""
                    value={code}
                    onChange={(value) => {
                        setCode(value);
                    }}
                />
            </Flex>
        </Modal>
    );
};

export default AuthenticationModal;
