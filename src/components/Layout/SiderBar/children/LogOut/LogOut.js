/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import StyledButtonContainer from './LogOut.styles';
import {  message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useAccountStore from 'store/common/account';
import { useHistory } from 'react-router';
import Button from 'ui/Button/Button';
const { confirm } = Modal;

const LogOut = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { clearAll, logout } = useAccountStore();
  const showMessage = useCallback(() => {
    logout().subscribe({
      next: ({ error }) => {
        if (error) {
          message.error(error?.title);
          clearAll();
          history.push('/');
        } else {
          message.loading(t('common.pleaseWait'), 1.5).then(() => {
            message.success(t('login.success'), 1);
            clearAll();
          });
        }
      },
      error: () => {
        message.success(t('login.success'), 1);
        clearAll();
        history.push('/');
      }
    });
  }, [t]);

  const showConfirmation = useCallback(() => {
    confirm({
      title: t('login.confirmTitle'),
      icon: <ExclamationCircleOutlined />,
      okButtonProps: { style: { background: '#212E41' } },
      content: t('login.confirmMessage'),
      onOk: showMessage
    });
  }, [t, showMessage]);


  return (
    <StyledButtonContainer>
    <Button
      $capitalize
      loading={false}
      disabled={false}
      type="primary"
      color="primary"
      onClick={showConfirmation}
      icon={<LogoutOutlined />}
      style={{width:240,height:50,fontSize:20}}
      
    >
      {t('login.logOut')}
    </Button>
    </StyledButtonContainer>
  );
};

export default LogOut;