import { PlusOutlined } from '@ant-design/icons';
import { Button, message, FormInstance } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage} from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { getRepository, createRepository, updateRepository } from '@/services/ant-design-pro/repository';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [currentRow, setCurrentRow] = useState<API.RepositoryListItem>();

  /** 国际化配置 */
  const intl = useIntl();

  const columns: ProColumns<API.RepositoryListItem>[] = [
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
      title: <FormattedMessage id="pages.gitSource"/>,
      dataIndex: 'gitSource',
      valueType: 'textarea',
      hideInSearch: true,
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
        <a onClick={() => { setCurrentRow(record); handleUpdateModalVisible(true); formRef.current?.setFieldsValue(record)}}><FormattedMessage id="pages.edit"/></a>,
      ],
    },
  ];

  const handleAdd = async (fields: API.RepositoryListItem) => {
    const hide = message.loading('正在添加');
    try {
      await createRepository({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  const handleUpdate = async (fields: API.RepositoryListItem) => {
    const hide = message.loading('正在更新');
    try {
      await updateRepository({ ...currentRow, ...fields });
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
      <ProTable<API.RepositoryListItem, API.PageParams>
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
        request={getRepository}
        columns={columns}
      />
      <ModalForm
        title={intl.formatMessage({id: 'pages.create.repository'})}
        width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RepositoryListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return true
        }}
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
              message: (<FormattedMessage id="pages.gitSource"/>),
            },
          ]}
          name="gitSource"
          placeholder={intl.formatMessage({id: 'pages.gitSource'})}
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
      </ModalForm>
      
      <ModalForm
        title={intl.formatMessage({id: 'pages.update.repository'})}
        width="600px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(value as API.RepositoryListItem);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return true
        }}
        formRef={formRef}
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
              message: (<FormattedMessage id="pages.gitSource"/>),
            },
          ]}
          name="gitSource"
          placeholder={intl.formatMessage({id: 'pages.gitSource'})}
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
      </ModalForm>

    </PageContainer>
  );
};

export default TableList;
