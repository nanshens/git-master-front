import { PlusOutlined } from '@ant-design/icons';
import { Button, message, FormInstance } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage} from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormSelect, ProFormList } from '@ant-design/pro-form';
import { getModule, createModule, updateModule } from '@/services/ant-design-pro/module';
import { getAllRepository } from '@/services/ant-design-pro/repository';

const TableList: React.FC = () => {
  const intl = useIntl();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const updateRef = useRef<FormInstance>();
  const createRef = useRef<FormInstance>();
  const [currentRow, setCurrentRow] = useState<API.ModuleListItem>();
  const [repository, setRepository] = useState<API.RepositoryListItem[]>([]);

  useEffect(() => {
    getAllRepository().then(({ data }) => setRepository(data || []));
  }, []);

  const columns: ProColumns<API.ModuleListItem>[] = [
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
      title: <FormattedMessage id="pages.note" />,
      dataIndex: 'note',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a onClick={() => { setCurrentRow(record); handleUpdateModalVisible(true); updateRef.current?.setFieldsValue(record)}}><FormattedMessage id="pages.edit"/></a>,
      ],
    },
  ];

  const handleAdd = async (fields: API.ModuleListItem) => {
    const hide = message.loading('正在添加');
    try {
      await createModule({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  const handleUpdate = async (fields: API.ModuleListItem) => {
    const hide = message.loading('正在更新');
    try {
      await updateModule({ ...currentRow, ...fields });
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
      <ProTable<API.ModuleListItem, API.PageParams>
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
        request={getModule}
        columns={columns}
      />
      <ModalForm
        title={intl.formatMessage({id: 'pages.create.module'})}
        width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ModuleListItem);
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
          name="repositories"
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
            request={async () => repository.map(r => ({label: r.code, value: r.id }))}
          />
        </ProFormList>
      </ModalForm>
      
      <ModalForm
        title={intl.formatMessage({id: 'pages.update.module'})}
        width="600px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value as API.ModuleListItem);
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
          name="repositories"
          initialValue={currentRow?.repositories}
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
            request={async () => repository.map(r => ({label: r.code, value: r.id }))}
          />
        </ProFormList>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
