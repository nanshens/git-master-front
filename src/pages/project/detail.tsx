import React, { useState, useRef, useEffect } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert, Button, Row, Col, Space, Statistic, Divider, Drawer, Table, Tag, Input, Select, Spin, message, FormInstance } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl, FormattedMessage, useParams } from 'umi';
import ProCard from '@ant-design/pro-card';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getReleaseInfo, refreshCheckMessage, getCheckMessage, postCheckMessage } from '@/services/ant-design-pro/project';
import moment from 'moment';
import { ModalForm, ProFormText, } from '@ant-design/pro-form';



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
  const checkColumns = [
    {
      title: <FormattedMessage id="pages.commitTime"/>,
      dataIndex: 'commitTimestamp',
      key: 'commitTimestamp',
      render: (time:string) => (
        time === null ? '' : moment(parseInt(time) * 1000).format('YYYY-MM-DD HH:mm:ss')
      )
    },
    {
      title: <FormattedMessage id="pages.commitVersion"/>,
      dataIndex: 'commitVersion',
      key: 'commitVersion',
      render: (version:string) => (
        version.substring(0, 10)
      )
    },
    {
      title: <FormattedMessage id="pages.commitAuthor"/>,
      dataIndex: 'commitAuthor',
      key: 'commitAuthor',
    },
    {
      title: <FormattedMessage id="pages.commitInfo"/>,
      dataIndex: 'commitMessage',
      key: 'commitMessage',
      render: (message:string) => (
        message.substring(0, 100)
      )
    },
    {
      title: <FormattedMessage id="pages.commitCheck"/>,
      dataIndex: 'checkStatus',
      key: 'checkStatus',
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
      render: (datetime:string) => (
        datetime === null ? '' : moment(datetime).format('YYYY-MM-DD hh:mm:ss')
      )
    },
    {
      title: <FormattedMessage id="pages.checkNote"/>,
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption"/>,
      dataIndex: 'option',
      key: 'option',
      width: 80,
      render: (_:any, record:any) => (
        <Space key = '1'>
          <a key="check" onClick={() => { setCurrentRow(record); handleCheckModalVisible(true); }} >
          <FormattedMessage id="pages.check" />
          </a>
          {/* <a key="note" onClick={() => { }} >
          <FormattedMessage id="pages.note" />
          </a> */}
        </Space>
      )
    },
  ];

  const intl = useIntl();
  const checkRef = useRef<FormInstance>();
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [showDiff, setShowDiff] = useState<boolean>(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<API.CheckMessageDto>();
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<API.ProjectReleaseInfo>();
  const [checkMessage, setCheckMessage] = useState<API.CheckMessageDto[]>([]);
  const [checkModalVisible, handleCheckModalVisible] = useState<boolean>(false);
  const params = useParams();
  useEffect(() => {
    getReleaseInfo({projectId: params.id }).then(({ data }) => {setDetail(data); setLoading(false);});
  }, []);

  const refreshCheckMessageClick = (moduleId?:string) => {
    refreshCheckMessage({projectId: params.id,  moduleId: moduleId}).then(({ data }) => message.success('更新了 ' + data + ' 个提交'));
    getReleaseInfo({projectId: params.id }).then(({ data }) => {setDetail(data); setLoading(false);});
  } 

  const checkMessageClick = (moduleId:string, gitInfoId: string) => {
    setCheckMessage([])
    getCheckMessage({projectId: params.id,  moduleId, gitInfoId}).then(({ data }) => setCheckMessage(data));
    setShowCheck(true);
  }

  const handleCheckMessage = async (note:string) => {
    const hide = message.loading('正在更新');
    try {
      if (currentRow === undefined) {
        if (selectedRowIds.length > 0){
          await postCheckMessage({ checkUser:'admin', commits:selectedRowIds, note});
          setSelectedRowIds([]);
        }
      } else {
        await postCheckMessage({ checkUser:'admin', commits:[currentRow.id], note});
        setCurrentRow(undefined);
      }
      hide();
      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
      return false;
    }
  };

  const onSelectChange = (keys: any) => {
    setSelectedRowIds(keys);
  }
  return (
    <Spin spinning={loading} size="large" tip="超级努力加载中...">
    <PageContainer 
      extra={[
        <Button key="2">编辑信息</Button>,
        <Button key="3">发布历史</Button>,
        <Button key="5" onClick={() => refreshCheckMessageClick()}>刷新提交</Button>,
        <Button key="1" type='dashed'>创建预发布分支</Button>,
        <Button key="4" type="primary" danger>发布</Button>,
      ]}
      content={
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>GE</Col>
          <Col className="gutter-row" span={4}>
            <Row>当前发布分支</Row>
            <Row>{detail?.projectDto.currentBranch}</Row>
            <Row>{moment(detail?.projectDto.currentCreateTime).format('YYYY-MM-DD')}</Row>
            <Row>{moment(detail?.projectDto.currentReleaseTime).format('YYYY-MM-DD')}</Row>
          </Col>
          <Col className="gutter-row" span={4}>
            <Row>预发布分支</Row>
            <Row>{detail?.projectDto.prepareBranch}</Row>
            <Row>{moment(detail?.projectDto.prepareCreateTime).format('YYYY-MM-DD')}</Row>
          </Col>
          <Col className="gutter-row" span={4}>
            <Row>未验证总提交</Row>
            <Row>{detail?.projectDto.uncheckCommit}</Row>
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
          detail?.moduleReleaseDtos.map(module => (
            <ProCard bordered headerBordered
              title={
                <Space>
                  {module.code}
                  <Divider type="vertical" style={{ backgroundColor: '#52c41a' }}/>
                  {module.currentBranch} - {moment(module.currentCreateTime).format('YYYY-MM-DD')} - {moment(module.currentReleaseTime).format('YYYY-MM-DD')}
                  <Divider type="vertical" style={{ backgroundColor: '#52c41a' }}/>
                  {module.prepareBranch} - {moment(module.prepareCreateTime).format('YYYY-MM-DD')}
                </Space>
              }  
              extra={
                <Space>
                  <Button key="1" >查看发布历史</Button>
                  <Button key="4" onClick={() => refreshCheckMessageClick(module.id)}>刷新提交</Button>
                  <Button key="2" type='dashed'>创建预发布分支</Button>
                  <Button key="3" type="primary" danger>发布</Button>
                </Space>
              }
              key={module.id}
              hoverable
            >
            <ProCard>
              <Space direction="horizontal" size='large' >
                {
                  module.repositoryReleaseDtos.map((repository:any) => (
                    <ProCard
                      hoverable
                      bordered
                      title={
                        <Row style={{width: '150px'}}>
                          <div style={{textAlign: 'center', width: '100%'}}>{repository.code}</div>
                          
                          {/* <Divider type="vertical" style={{ backgroundColor: '#fa8c16' }}/>
                          {repository.currentReleaseVersion} 
                          <Divider type="vertical" style={{ backgroundColor: '#fa8c16' }}/>
                          {repository.prepareReleaseVersion} */}
                        </Row>
                      } 
                      // style={{ width: 300 }}
                      actions={[
                        <a key="checkcommit"  onClick={() => checkMessageClick(module.id, repository.id)} > <FormattedMessage id="pages.checkCommit" /></a>,
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
        zIndex={999}
        width="80%"
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
            <Row gutter={16}>
              <Col span={12}><Button onClick={() => setShowCheck(false)} style={{ width: "100%" }}> 取消 </Button></Col>
              <Col span={12}><Button onClick={() =>{ handleCheckModalVisible(true);}} type="primary" style={{ width: "100%" }}> 批量验证 </Button></Col>
            </Row>
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
        <Table columns={checkColumns} dataSource={checkMessage} 
        rowSelection={{onChange: onSelectChange}} rowKey="id"/>
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
      <ModalForm
        modalProps={{zIndex: 1000}}
        title={intl.formatMessage({id: 'pages.update.checkMessage'})}
        width="600px"
        visible={checkModalVisible}
        onVisibleChange={handleCheckModalVisible}
        onFinish={async (value) => {
          const success = await handleCheckMessage(value.note);
          if (success) {
            handleCheckModalVisible(false);
            setCurrentRow(undefined);
          }
          return true
        }}
        formRef={checkRef}
      >
        {/* <ProFormText
          name="code"
          disabled
        /> */}
          <ProFormText
          placeholder={intl.formatMessage({id: 'pages.note'})}
          name="note"
        />
      </ModalForm>
    </PageContainer>
    </Spin>
  );
};
