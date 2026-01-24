import { Button, ConfigProvider } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React from 'react'

/**
 * A custom button component that is used to submit a post/article.
 *
 * It is a green button with a white text and a project icon.
 * It has a hover effect that changes the background color to a darker green.
 * It also has an active effect that changes the background color to an even darker green and the text color to white.
 *
 * @param {boolean} loading - Whether the button is in a loading state or not.
 * @param {React.ButtonHTMLAttributes} props - The props of the button component.
 * @returns {React.ReactElement} - The button component.
 */

type ButtonProps = {
    loading? : boolean;
    icon? : React.ReactNode;
    label: string;
    onClick? : React.MouseEventHandler<HTMLElement>;
    className? : string;
    size? : SizeType;
}

const ButtonPrimary = ( { loading=false, icon, label, onClick, className, size } : ButtonProps) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultBg: '#FF6500',
                        defaultColor: 'white',
                        defaultHoverBorderColor: '#CC561E',

                        defaultActiveColor: 'white',
                        defaultActiveBorderColor: '#CC561E',
                        defaultActiveBg: '#CC561E',

                        defaultHoverBg: '#f58c47',
                        defaultHoverColor: 'white',
                    }
                }
            }}>
            <Button
                size={size}
                className={`ml-2 ${className}`}
                htmlType="submit"
                icon={icon}
                loading={loading}
                onClick={onClick}
            >
                { label }
            </Button>
        </ConfigProvider>
    )
}

export default ButtonPrimary
