import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert, Button, Row, Col, Space, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl, FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';

const dataSource: any[] = [
  {
    'code': 'geerp',
    'currentBranch': '2021W12',
    'currentReleaseDate': '2020-02-92',
    'currentCreateDate': '2020-02-92',
    'currentReleaseVersion': '123123123',
    'prepareBranch': '2022w22',
    'prepareCreateDate': '2020-02-92',
    'prepareReleaseVersion': '124534',
    'uncheckCommit': '80',

  }
]

const columns = [
  {
    title: <FormattedMessage id="pages.code"/>,
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: <FormattedMessage id="pages.currentBranch"/>,
    dataIndex: 'currentBranch',
    key: 'currentBranch',
  },
  {
    title: <FormattedMessage id="pages.currentReleaseDate"/>,
    dataIndex: 'currentReleaseDate',
    key: 'currentReleaseDate',
  },
  {
    title: <FormattedMessage id="pages.currentCreateDate"/>,
    dataIndex: 'currentCreateDate',
    key: 'currentCreateDate',
  },
  {
    title: <FormattedMessage id="pages.currentReleaseVersion"/>,
    dataIndex: 'currentReleaseVersion',
    key: 'currentReleaseVersion',
  },
  {
    title: <FormattedMessage id="pages.prepareBranch"/>,
    dataIndex: 'prepareBranch',
    key: 'prepareBranch',
  },
  {
    title: <FormattedMessage id="pages.prepareCreateDate"/>,
    dataIndex: 'prepareCreateDate',
    key: 'prepareCreateDate',
  },
  {
    title: <FormattedMessage id="pages.prepareReleaseVersion"/>,
    dataIndex: 'prepareReleaseVersion',
    key: 'prepareReleaseVersion',
  },
  {
    title: <FormattedMessage id="pages.uncheckCommit"/>,
    dataIndex: 'uncheckCommit',
    key: 'uncheckCommit',
  },
  {
    title: <FormattedMessage id="pages.searchTable.titleOption"/>,
    dataIndex: 'option',
    key: 'option',
    render: (_:any, record:any) => (
      <Space key = '1'>
        <a key="checkcommit"
          onClick={() => {
          }}
        >
          <FormattedMessage id="pages.checkCommit" />
        </a>
        <a key="diffcompare"
        onClick={() => {
        }}
        >
        <FormattedMessage id="pages.diffCompare" />
      </a>
      </Space>
    )
  },
];

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer 
      extra={[
        <Button key="2">编辑信息</Button>,
        <Button key="3">发布历史</Button>,
        <Button key="6">添加模块</Button>,
        <Button key="1" type='dashed'>创建预发布分支</Button>,
        <Button key="4" type="primary" danger>发布</Button>,
      ]}
      content={
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>GE</Col>
          <Col className="gutter-row" span={4}>
            <Row>当前发布分支</Row>
            <Row>2021W12</Row>
            <Row>2021-01-11</Row>
            <Row>2021-01-11</Row>
          </Col>
          <Col className="gutter-row" span={4}>
            <Row>预发布分支</Row>
            <Row>2021W12</Row>
            <Row>2021-01-11</Row>
            <Row>2021-01-11</Row>
          </Col>
          <Col className="gutter-row" span={4}>
            <Row>未验证总提交</Row>
            <Row>88</Row>
          </Col>
          <Col className="gutter-row" span={4}>
            <Row>发布进度</Row>
            <Row>80%</Row>
          </Col>
        </Row>
      }
    >
    <ProCard title="GE"  bordered headerBordered
      extra={
        <Space>
          <Button key="1" >查看发布历史</Button>
          <Button key="2" type='dashed'>创建预发布分支</Button>
          <Button key="3" type="primary" danger>发布</Button>
        </Space>
       }
    >
      <Table dataSource={dataSource} columns={columns}></Table>
    </ProCard>
    </PageContainer>
  );
};
