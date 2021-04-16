import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Space } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Dashboard.less';

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Space direction="vertical" size='large'>
        <Card style={{ width:"100%" }}>
          ge项目发布情况
          已经发布分支,时间版本
          预发布分支 时间 版本 进程
          进入管理 按钮
          颜色匹配
        </Card>
        <Card>
          fe项目发布情况
        </Card>
        <Card>
          ct项目发布情况
        </Card>
        <Card>
          mim项目发布情况
        </Card>
      </Space>

    </PageContainer>
  );
};
