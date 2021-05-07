import { PlusOutlined } from '@ant-design/icons';
import { Button, message, FormInstance } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, Link } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect, ProFormList } from '@ant-design/pro-form';
import { getProject, createProject, updateProject } from '@/services/ant-design-pro/project';
import { getAllModule } from '@/services/ant-design-pro/module';


const TableList: React.FC = () => {
  const intl = useIntl();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const updateRef = useRef<FormInstance>();
  const createRef = useRef<FormInstance>();
  const [currentRow, setCurrentRow] = useState<API.ProjectListDto>();
  const [module, setModule] = useState<API.ModuleListDto[]>([]);

  useEffect(() => {
    getAllModule().then(({ data }) => setModule(data || []));
  }, []);

  const columns: ProColumns<API.ProjectListDto>[] = [
    {
      title: <FormattedMessage id="pages.code"  />,
      dataIndex: 'code',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.name"  />,
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.currentBranch"/>,
      dataIndex: 'currentBranch',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.currentReleaseDate" />,
      dataIndex: 'currentReleaseDate',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.prepareBranch" />,
      dataIndex: 'prepareBranch',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.prepareCreateDate" />,
      dataIndex: 'prepareCreateDate',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.releaseProcess"  />,
      dataIndex: 'releaseProcess',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a onClick={() => { setCurrentRow(record); handleUpdateModalVisible(true); console.log(record); updateRef.current?.setFieldsValue(record)}}><FormattedMessage id="pages.edit"/></a>,
        <Link to={`/project/${record.id}`}><FormattedMessage id="pages.gotoProject"/></Link>,
      ],
    },
  ];

  const handleAdd = async (fields: API.ProjectListDto) => {
    const hide = message.loading('正在添加');
    try {
      await createProject({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  const handleUpdate = async (fields: API.ProjectListDto) => {
    const hide = message.loading('正在更新');
    try {
      await updateProject({ ...currentRow, ...fields });
      hide();
      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
      return false;
    }
  };

  return (
    <PageContainer>
      <ProTable<API.ProjectListDto, API.PageParams>
        actionRef={actionRef}
        rowKey="code"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={getProject}
        columns={columns}
      />
      <ModalForm
        title={intl.formatMessage({id: 'pages.create.project'})}
        width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ModuleListDto);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return true
        }}
        formRef={createRef}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (<FormattedMessage id="pages.code"/>),
            },
          ]}
          name="code"
          placeholder={intl.formatMessage({id: 'pages.code'})}
        />
          <ProFormText
          rules={[
            {
              required: true,
              message: (<FormattedMessage id="pages.name"/>),
            },
          ]}
          name="name"
          placeholder={intl.formatMessage({id: 'pages.name'})}
        />  
          <ProFormText
          rules={[
            {
              required: true,
              message: (<FormattedMessage id="pages.note"/>),
            },
          ]}
          name="note"
          placeholder={intl.formatMessage({id: 'pages.note'})}
        /> 
        <ProFormList
          name="modules"
          creatorButtonProps={{
            position: 'top',
            creatorButtonText: '添加模块',
          }}
          creatorRecord={{
            id: '',
          }}
        >
          <ProFormSelect
            width={508}
            name="id"
            request={async () => module.map(r => ({label: r.code, value: r.id }))}
          />
        </ProFormList>
      </ModalForm>
      
      <ModalForm
        title={intl.formatMessage({id: 'pages.update.project'})}
        width="600px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value as API.ModuleListDto);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return true
        }}
        formRef={updateRef}
      >
        <ProFormText
          name="code"
          disabled
        />
          <ProFormText
          rules={[
            {
              required: true,
              message: (<FormattedMessage id="pages.name"/>),
            },
          ]}
          placeholder={intl.formatMessage({id: 'pages.name'})}
          name="name"
        />   
          <ProFormText
          rules={[
            {
              required: true,
              message: (<FormattedMessage id="pages.note"/>),
            },
          ]}
          name="note"
          placeholder={intl.formatMessage({id: 'pages.note'})}
        />  
        <ProFormList
          name="modules"
          initialValue={currentRow?.modules}
          creatorButtonProps={{
            position: 'top',
            creatorButtonText: '添加模块',
          }}
          creatorRecord={{
            id: '',
          }}
        >
          <ProFormSelect
            width={508}
            name="id"
            request={async () => module.map(r => ({label: r.code, value: r.id }))}
          />
        </ProFormList>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
