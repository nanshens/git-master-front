import React, { useState, useRef } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert, Button, Row, Col, Space, Statistic, Divider, Drawer, Table, Tag, Input, Select   } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl, FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Option } = Select;

const moduleData: any[] = [
  {
    "id": "1231311112",
    "code": "GE",
    'currentBranch': '2021W12',
    'currentReleaseDate': '2020-02-92',
    'currentCreateDate': '2020-02-92',
    'prepareBranch': '2022w22',
    'prepareCreateDate': '2020-02-92',
    "repository": [
      {
        'id': '1231231345523',
        'code': 'geerp',
        'currentReleaseVersion': '1sd56f8o',
        'prepareReleaseVersion': '1sd56f8o',
        'uncheckCommit': '80',
      },
    ]
  },

  {
    "id": "1231311112465456",
    "code": "accounting",
    'currentBranch': '2021W12',
    'currentReleaseDate': '2020-02-92',
    'currentCreateDate': '2020-02-92',
    'prepareBranch': '2022w22',
    'prepareCreateDate': '2020-02-92',
    "repository": [
      {
        'id': '123123123',
        'code': 'dto',
        'currentReleaseVersion': '1sd56f8o',
        'prepareReleaseVersion': '1sd56f8o',
        'uncheckCommit': '80',
      },
      {
        'id': '1231233',
        'code': 'base',
        'currentReleaseVersion': '1sd56f8o',
        'prepareReleaseVersion': '1sd56f8o',
        'uncheckCommit': '80',
      },
      {
        'id': '1231234',
        'code': 'client',
        'currentReleaseVersion': '1sd56f8o',
        'prepareReleaseVersion': '1sd56f8o',
        'uncheckCommit': '80',
      },
    ]
  }


]

const checkColumns = [
  {
    title: <FormattedMessage id="pages.commitVersion"/>,
    dataIndex: 'commitVersion',
    key: 'commitVersion',
  },
  {
    title: <FormattedMessage id="pages.commitAuthor"/>,
    dataIndex: 'commitAuthor',
    key: 'commitAuthor',
  },
  {
    title: <FormattedMessage id="pages.commitInfo"/>,
    dataIndex: 'commitInfo',
    key: 'commitInfo',
  },
  {
    title: <FormattedMessage id="pages.commitCheck"/>,
    dataIndex: 'commitCheck',
    key: 'commitCheck',
    render: (check:boolean) => (
      <Tag color={check ? "green" : "red"}>
        {check ? "已验证": "未验证"}
      </Tag>
    )
  },
  {
    title: <FormattedMessage id="pages.checkUser"/>,
    dataIndex: 'checkUser',
    key: 'checkUser',
  },
  {
    title: <FormattedMessage id="pages.checkDate"/>,
    dataIndex: 'checkDate',
    key: 'checkDate',
  },
  {
    title: <FormattedMessage id="pages.checkNote"/>,
    dataIndex: 'checkNote',
    key: 'checkNote',
  },
  {
    title: <FormattedMessage id="pages.searchTable.titleOption"/>,
    dataIndex: 'option',
    key: 'option',
    render: (_:any, record:any) => (
      <Space key = '1'>
        <a key="check" onClick={() => { }} >
        <FormattedMessage id="pages.check" />
      </a>
      </Space>
    )
  },
];

const checkData: any[] = [
  {
    "id": "1",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": false,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "2",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": true,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "3",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": false,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "4",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": true,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "5",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": false,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  }
]

const diffColumns = [
  {
    title: <FormattedMessage id="pages.commitVersion"/>,
    dataIndex: 'commitVersion',
    key: 'commitVersion',
  },
  {
    title: <FormattedMessage id="pages.commitBranch"/>,
    dataIndex: 'commitBranch',
    key: 'commitBranch',
  },
  {
    title: <FormattedMessage id="pages.commitAuthor"/>,
    dataIndex: 'commitAuthor',
    key: 'commitAuthor',
  },
  {
    title: <FormattedMessage id="pages.commitInfo"/>,
    dataIndex: 'commitInfo',
    key: 'commitInfo',
  },
  {
    title: <FormattedMessage id="pages.commitCheck"/>,
    dataIndex: 'commitCheck',
    key: 'commitCheck',
    render: (check:boolean) => (
      <Tag color={check ? "green" : "red"}>
        {check ? "已验证": "未验证"}
      </Tag>
    )
  },
  {
    title: <FormattedMessage id="pages.checkUser"/>,
    dataIndex: 'checkUser',
    key: 'checkUser',
  },
  {
    title: <FormattedMessage id="pages.checkDate"/>,
    dataIndex: 'checkDate',
    key: 'checkDate',
  },
  {
    title: <FormattedMessage id="pages.checkNote"/>,
    dataIndex: 'checkNote',
    key: 'checkNote',
  },
];

const diffData: any[] = [
  {
    "id": "1",
    "commitBranch": "dev",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": false,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "2",
    "commitBranch": "dev",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": true,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "3",
    "commitBranch": "dev",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": false,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "4",
    "commitBranch": "dev",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": true,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  },
  {
    "id": "5",
    "commitBranch": "dev",
    "commitVersion": "1231vcgs1",
    "commitAuthor": "zhang",
    "commitInfo": "TAM-123 12313QEJSDHGFSHVFJ ;",
    "commitCheck": false,
    "checkUser": "ping",
    "checkDate": "2020-02-12",
    "checkNote": "tam test [ass",
  }
]

export default (): React.ReactNode => {
  const intl = useIntl();
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [showDiff, setShowDiff] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (keys:any, recod:any) => {
  //     console.log(keys, recod)
  //     setSelectedRowKeys(keys)},
  // };

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
      <Space direction="vertical" size='large' style={{ width:"100%" }}>
        {  
          moduleData.map(module => (
            <ProCard bordered headerBordered
              title={
                <Space>
                  {module.code}
                  <Divider type="vertical" style={{ backgroundColor: '#52c41a' }}/>
                  {module.currentBranch} - {module.currentCreateDate} - {module.currentReleaseDate}
                  <Divider type="vertical" style={{ backgroundColor: '#52c41a' }}/>
                  {module.prepareBranch} - {module.prepareCreateDate}
                </Space>
              }  
              extra={
                <Space>
                  <Button key="1" >查看发布历史</Button>
                  <Button key="2" type='dashed'>创建预发布分支</Button>
                  <Button key="3" type="primary" danger>发布</Button>
                </Space>
              }
              key={module.id}
            >
            <ProCard>
              <Space direction="horizontal" size='large' >
                {
                  module.repository.map((repository:any) => (
                    <ProCard
                      bordered
                      title={
                        <Space>
                          {repository.code}
                          <Divider type="vertical" style={{ backgroundColor: '#fa8c16' }}/>
                          {repository.currentReleaseVersion} 
                          <Divider type="vertical" style={{ backgroundColor: '#fa8c16' }}/>
                          {repository.prepareReleaseVersion}
                        </Space>
                      } 
                      // style={{ width: 300 }}
                      actions={[
                        <a key="checkcommit"  onClick={() => { setShowCheck(true); }} > <FormattedMessage id="pages.checkCommit" /></a>,
                        <a key="diffcompare" onClick={() => { setShowDiff(true);}} > <FormattedMessage id="pages.diffCompare" /> </a>
                      ]}
                      key={repository.id}
                    >
                      <Row>
                        <Col span={24} style={{ textAlign: "center" }}>
                          <Statistic title="未验证提交" value={repository.uncheckCommit}/>
                        </Col>
                        
                      </Row>
                    </ProCard>
                  ))
                }
              </Space>
            </ProCard>
          </ProCard>
          ))
        }
      </Space>
      <Drawer
        width="60%"
        maskClosable={false}
        visible={showCheck}
        closable={false}
        title={
          <div>
            DTO 验证提交
          </div>
        }
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setShowCheck(false)} style={{ marginRight: 8 }}> 取消 </Button>
            <Button onClick={() =>{}} type="primary"> 保存 </Button>
          </div>
        }
      >
        <Row style={{ marginBottom: "50px"}}>
          <Col span={6} >
            <Row>DTO</Row>
            <Row>DTO</Row>
          </Col>
          <Col span={6}>
            <Row>已发布分支和版本</Row>
            <Row>2020W12</Row>
            <Row>12d12dds</Row>
          </Col>
          <Col span={6}>
            <Row>预发布分支和版本</Row>
            <Row>2020W32</Row>
            <Row>12d3cd22</Row>
          </Col>
        </Row>
        <Table columns={checkColumns} dataSource={checkData} 
          rowSelection={{ onChange: (_, selectedRows) => {setSelectedRowKeys(selectedRows);}}} />
      </Drawer>
      <Drawer
        width="60%"
        maskClosable={false}
        visible={showDiff}
        closable={false}
        title={
          <div>
            DTO 分支差异
          </div>
        }
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setShowDiff(false)} style={{ marginRight: 8, width: "100%" }}> 取消 </Button>
          </div>
        }
      >
        <Row style={{ marginBottom: "50px"}}>
          <Col span={12}>
            <Row> <Select></Select> to <Select></Select></Row>
          </Col>
          <Col span={12}>
            <Row>issue <Input></Input> <Button>对比</Button></Row>
          </Col>
        </Row>
        <Table columns={diffColumns} dataSource={diffData} rowSelection={{ onChange: (_, selectedRows) => {setSelectedRowKeys(selectedRows);}}}></Table>
        <Table columns={diffColumns} dataSource={diffData} rowSelection={{ onChange: (_, selectedRows) => {setSelectedRowKeys(selectedRows);}}} ></Table>
      </Drawer>
    </PageContainer>
  );
};
