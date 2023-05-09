import { Alert } from 'antd';

interface IProps {
    message: string;
    type: "success" | "info" | "warning" | "error" | undefined;
    showIcon?: boolean;
    closable?: boolean;
}

const CAlert = (props: IProps) => {
    const { message, type, showIcon=false, closable=false } = props;

    return (
        <Alert message={message} type={type} showIcon={showIcon} closable={closable} />
    );
};

export default CAlert;