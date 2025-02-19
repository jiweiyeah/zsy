// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  result: string | string[];
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum?: number;
  pageSize?: number;
  total?: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    userName: string;
    userPwd: string;
    captcha: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    contract: string;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}

// 市场开发模块
export namespace Market {
  //市场营销
  export interface MarkTable {
    id: string;
    clientName: string; //客户名称
    date: Date; //时间
    orgUnit: string; //组织单位
    content: string; //沟通内容
    way: number; //方式
    location: string; //地点
    head: string; //主要负责人
    participants: string; //参与人员
    note: string; //备注
  }
  //技术宣讲
  export interface TechTable {
    id: string;
    organizer: string; //主办单位
    preTheme: string; //宣讲主题
    preContent: string; //营销内容
    preFormat: string; //宣讲形式
    prePlace: string; //地点
    comInvolved: string; //涉及油公司
    startTime: Date; //起始日期
    endTime: Date; //结束日期
    staff: string; //报告&筹备人员
    note: string; //备注
  }
  //投标统计
  export interface BidTable {
    id: string;
    area: string; //地区
    country: string; //国家
    lessor: string; //甲方
    projectName: string; //项目名称
    inviteTime: Date; //邀标时间
    closeTime: Date; //闭标时间
    busidateType: string; //业务类别
    tenderBody: string; //投标主体
    support: string; //是否总部支持
    tenderMethod: string; //招标方式
    evaDynamics: string; //评标动态
    date: string; //中/落/弃标时间
    reason: string; //落/弃标原因
    amount: string; //预计合同额（万美元）
    workload: string; //工作量
    univalent: string; //单价
    prive: string; //总价（万美元）
    integration: string; //是否一体化
    note: string; //备注
  }
  //新签市场
  export interface NewSignTable {
    id: string;
    area: string; //地区
    country: string; //国家
    workareaName: string; //工区名称
    lessor: string; //甲方
    ourCompany: string; //我方签约公司名称
    signatoryName: string; //我方合同签字人姓名
    projectName: string; //项目名称
    contractNum: string; //合同号
    workNature: string; //报告&工作性质
    integration: string; //是否一体化项目
    surfaceType: string; //工区地表类型
    pstm: string; //是否PSTM
    psdm: string; //是否PSDM
    workload_2d: string; //工作量2D
    workload_3d: string; //工作量3D
    contractAmount: string; //新签合同额(万美元)
    signDate: Date; //合同签订日期
    closeDate: Date; //合同关闭日期
    note: string; //备注
  }
  //潜在项目
  export interface PotProjectTable {
    projectId: string;
    centerName: string; //海外中心
    projectName: string; //项目名称
    country: string; //国家
    clientName: string; //客户
    workloadKm: string; //工作量_平方千米
    workloadSqkm: string; //工作量_千米
    contract: string; //合同额（万美元）
    conType: string; //项目类型
    fulfilExtent: string; //落实程度
    impActive: string; //重要动态
  }
}

// 合同管理模块
export namespace Contract {
  //收入合同
  export interface InfilingTable {
    id: string;
    overseaCenter: string; //海外中心
    counterpartyUnit: string; //对方签约单位
    ourUnit: string; //我方签约单位
    contractName: string; //合同名称
    contractType: string; //合同类型
    incontractSource: string; //收入合同来源
    workload: string; //工作量
    contractAmount: string; //合同金额
    signingTime: Date; //预计签约时间
    approvalStatus: string; //审批状态
  }
  //支出合同
  export interface OutfilingTable {
    id: string;
    overseaCenter: string; //海外中心
    counterpartyUnit: string; //对方签约单位
    ourUnit: string; //我方签约单位
    contractName: string; //合同名称
    contractType: string; //合同类型
    contractAmount: string; //合同金额
    signingTime: Date; //预计签约时间
    approvalStatus: string; //审批状态
  }
  //管理合同
  export interface ManageTable {
    id: string;
    lessor: string; //甲方
    contractNum: string; //合同号
    ourCompany: string; //我方签约公司名称
    ourSignatory: string; //我方合同签字人姓名
    projectName: string; //项目名称
    workNature: string; //工作性质
    integration: string; //是否一体化项目
    contractAmount: string; //合同额(万美元)
    signTime: Date; //合同签订日期
    startTime: Date; //合同起始日期
    endTime: Date; //合同截止日期
    approvalStatus: string; //审批状态
  }
}

//数据大屏模块
export namespace Screen {
  //新闻
  export interface HotNews {
    title: string;
    href: string;
  }

  //新闻列表
  export interface HotNewsList {
    HotNewsLists: HotNews[];
  }
}

//领导者驾驶舱模块
export namespace Driver {
  //海外领导出访立项
  export interface leadVisits {
    id: string;
    startDate: Date;
    endDate: Date;
    expert: string;
    leader: string;
    followPeople: string;
    area: string;
    task: string;
    locus: string;
    note: string;
  }
  //海外中心市场累计完成进度
  export interface marketConditions {
    id: string;
    overseaCenter: string;
    annualMetrics: string;
    timeSchedule: string;
    done: string;
    lastYear: string;
  }
}

//权限管理模块
export namespace authority {
  //角色管理
  export interface roleManagement {
    id: string;
    name:string;
    note: string;
  }
  //用户管理
  export interface userManagement {
    id: string;
    overseaCenter: string;
    annualMetrics: string;
    timeSchedule: string;
    done: string;
    lastYear: string;
  }
}
