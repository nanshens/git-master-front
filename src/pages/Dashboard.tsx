import React from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Row, Col, Button, Progress } from 'antd';
import { useIntl, FormattedMessage, useModel, Link } from 'umi';
import { getDashboard } from '@/services/ant-design-pro/dashboard';
import moment from 'moment';

export default (): React.ReactNode => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [dashboard, setDashboard] = useState<API.DashboardDto[]>([]);

  useEffect(() => {
    getDashboard().then(({ data }) => setDashboard(data || []));
  }, []);

  return (
    <PageContainer>
      <Space direction="vertical" size='large' style={{ width:"100%" }}>
        {
          dashboard.map((item) => (
            <Card key={item.id} hoverable>
              <Row gutter={16}>
                <Col className="gutter-row" span={4}>
                  <div style={{ fontSize: '30px' }}>{item.code}</div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Row>当前分支</Row>
                  <Row>{item.currentBranch}</Row>
                  <Row>{item.currentCreateDate === null ? '' : moment(item.currentCreateDate).format('YYYY-MM-DD hh:mm:ss')}</Row>
                  <Row>{item.currentReleaseDate === null ? '' : moment(item.currentReleaseDate).format('YYYY-MM-DD hh:mm:ss')}</Row>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Row>预发布分支</Row>
                  <Row>{item.prepareBranch}</Row>
                  <Row>{item.prepareCreateDate === null ? '' : moment(item.prepareCreateDate).format('YYYY-MM-DD hh:mm:ss')}</Row>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Progress type="circle" percent={(item.totalCheckCommit - item.uncheckCommit) / item.totalCheckCommit} format={(percent) => `${parseInt(percent * 100)}%(${item.uncheckCommit})`}/>
                </Col>
                <Col className="gutter-row" span={4}>
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
