// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: string;
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginItem = {
    id?: string;
    name?: string;
    code?: string;
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type LoginResult = {
    code?: string;
    message?: string;
    success?: boolean;
    data: LoginItem;
  };


  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  // -------------------------------------

  type DashboardList = {
    data?: DashboardItem[];
    total?: number;
    success?: boolean;
  }

  type DashboardItem = {
    id?: string;
    code?: string;
    currentBranch?: string;
    currentCreateDate?: string;
    currentReleaseDate?: string;
    prepareBranch?: string;
    prepareCreateDate?: string;
    prepareReleaseDate?: string;
  }

  type ProjectList = {
    data?: ProjectListItem[];
    total?: number;
    success?: boolean;
  }

  type ProjectListItem = {
    id?: string;
    code?: string;
    name?: string;
    currentBranch?: string;
    currentReleaseDate?: string;
    prepareBranch?: string;
    prepareCreateDate?: string;
    process?: number;
    note?: string;
    modules?: ModuleListItem[];
  };

  type ModuleList = {
    data?: ModuleListItem[];
    total?: number;
    success?: boolean;
  }

  type ModuleListItem = {
    id?: string;
    code?: string;
    name?: string;
    note?: string;
    repositories?: RepositoryListItem[]
  };

  type RepositoryList = {
    data?: RepositoryListItem[];
    total?: number;
    success?: boolean;
  }

  type RepositoryListItem = {
    id?: string;
    code: string;
    name?: string;
    gitSource?: string;
    note?: string;
  };
}
