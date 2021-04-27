import React from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Row, Col, Button } from 'antd';
import { useIntl, FormattedMessage, useModel, Link } from 'umi';
import { getDashboard } from '@/services/ant-design-pro/dashboard';

export default (): React.ReactNode => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [dashboard, setDashboard] = useState<API.DashboardItem[]>([]);

  useEffect(() => {
    getDashboard().then(({ data }) => setDashboard(data || []));
  }, []);

  return (
    <PageContainer>
      <Space direction="vertical" size='large' style={{ width:"100%" }}>
        {
          dashboard.map((item) => (
            <Card key={item.id} >
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  {item.code}
                </Col>
                <Col className="gutter-row" span={6}>
                  <Row>当前分支</Row>
                  <Row>{item.currentBranch}</Row>
                  <Row>{item.currentCreateDate}</Row>
                  <Row>{item.currentReleaseDate}</Row>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Row>预发布分支</Row>
                  <Row>{item.prepareBranch}</Row>
                  <Row>{item.prepareCreateDate}</Row>
                  <Row>{item.prepareReleaseDate}</Row>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Link to={`/project/${item.id}`}><FormattedMessage id="pages.gotoProject"/></Link>
                </Col>
              </Row>
            </Card>
          ))
        }
       
      </Space>

    </PageContainer>
  );
};
