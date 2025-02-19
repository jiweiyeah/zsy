<template>
  <div class="table-box">
    <div class="card table-main">
      <el-row>
        <el-col :span="2">
          <!-- <div style="background-color:#FFEBCD;width:60px;height:60px;display:inline-block;border-radius:50%;overflow:hidden;">
                        <el-image :src="src" style="width:60px;height:60px;"></el-image>
                    </div> -->
          <div style="margin-top: 10px; margin-left: 1px">
            <el-button link style="font-size: 22px; color: #4d4d4d" @click="getInfo()">
              分中心信息
              <!-- <span style="color:#B0E0E6;" v-show="infomationShow" class="el-icon-s-promotion"></span> -->
            </el-button>
          </div>
          <!-- <div style="margin-top:5px;margin-left:1px;">
                        <el-button type="text" style="font-size:22px;color:#4D4D4D;" @click="passwordClick()">
                            修改密码
                        </el-button></div> -->
          <div style="margin-top: 5px; margin-left: 1px">
            <el-button link style="font-size: 22px; color: #4d4d4d" @click="getProject()">
              项目信息
              <!-- <span style="color:#B0E0E6;" v-show="passwordShow" class="el-icon-s-promotion"></span> -->
            </el-button>
          </div>
        </el-col>
        <!-- 个人信息 -->
        <el-col :span="22" v-show="infomationShow">
          <el-card style="margin-top: 10px">
            <p style="margin: 10px; margin-top: 0; font-size: 25px; text-align: center">中心简介</p>
            <span style="font-size: 22px; line-height: 34px">
              研究院总部位于河北省涿州市，下属13个单位，在国内建有15个靠前研究机构，遍布中国石油集团旗下所有油气田，先后挂牌成为西南油气田物探研究中心、塔里木油田分公司物探研究院、大港油田物探研究院、南方石油勘探开发有限责任公司物探研究中心、大庆油田物探研究院，成为各油气田密不可分和倚重的重要科研生产力量。近年来，随着中国石油“走出去”战略的实施，坚持“立足国内、发展国际”的发展战略，在国际12个国家设立了14个研究（支持）中心，形成了中东、西非、中亚、东南亚等规模生产基地，为中国石油海外业务发展提供了强有力技术支撑，先后挂牌成为中国石油海外勘探开发公司（CNODC）地质研究分中心、CNODC物探技术支持中心、中国石油海外物探技术中心、中国石油海外研究中心勘探技术分中心。与此同时积极进军国际油公司、国家油公司高端市场，先后为40多家国际和国家油公司提供处理解释、评价开发和计算机群运营技术服务。与国际油公司、地球物理服务公司和政府机构开展广泛的国际交流与合作，到目前为止有60多个国家的专家学者和高层管理者代表到研究院进行访问、合作和技术交流。
              <br>研究院党委下设1个党委、11个党总支、90个党支部，共有党员1450名，占员工总数的61
              %。现有员工近2400名，其中工程技术人员1900多名，拥有66名博士、610名硕士、近100余名行业有影响力专家组成的核心科技团队和一大批经验丰富的处理解释工程师。与国内浙江大学、中国科学技术大学、中国石油大学（北京）、中国石油大学（华东）、西北大学和美国科罗拉多矿业学院、加拿大卡尔加里大学等国内外近20所知名院校和研究机构有着广泛的技术交流与合作，与中国石油大学（北京）、中国石油大学（华东）、浙江大学地球科学系等10余所大学院系建立研究生联合培养基地和协同创新中心。
              研究院拥有17万核CPU和320万核GPU组成的超大型并行数据处理机群，运算能力达到12.4PFlops，存储能力达到200PB，拥有公司自主知识产权的GeoEast大型一体化软件和Omega、Paradigm、CGG、Landmark、Jason等世界先进处理解释软件，具有强大科研生产能力。
              <br>研究院始终致力物探技术进步，着力提升综合技术服务能力。在多年找油找气实践中，形成了适用于山地、沙漠、黄土塬、海洋等不同地表地质条件以及复杂构造、碳酸盐岩、地层-岩性、非常规等油气藏的地震资料处理解释配套技术，成为公司品牌技术--PAI技术系列的重要组成部分。其中，“双高”（高保真度、高分辨率）和“双复杂”区（复杂地表和复杂构造）技术、碳酸盐岩油气藏勘探和评价技术、地层-岩性油气藏综合评价技术、非常规油气藏“甜点”预测与综合评价技术、火山岩等特殊岩性体油气藏勘探评价技术、海洋拖缆与OBN地震资料处理技术、多波多分量及叠前反演储层预测技术、以“地震+”为核心的地震地质工程一体化技术等八项特色技术系列处于国际先进水平，并在国内外油气勘探技术服务中得到成功验证。
              研究院始终坚持以客户为中心、全力以赴助推客户成功的服务理念，始终牢记找油找气的崇高使命，坚持勘探开发生产服务与新区新领域综合地质研究并举，参与了克拉2、中秋1、满深1、高石1、双探1、角探1、蓬探1、玛湖1、高探1、康探1、城页1、米探1、牛东1、安探1、临华1、尖探1等多口突破井的部署。“十三五”以来，在玛湖10亿吨级砾岩特大油气田、塔北10亿吨级石油规模储量区、庆城长7段10亿吨页岩油田以及博孜-大北万亿方大气区、克拉苏东段万亿方大气区、川中下古-震旦系万亿方气田等中石油探区3个10亿吨和4个万亿方规模储量区的发现中发挥了关键的物探技术支撑作用。中国石油集团国内和国外探区每年的重大突破、重大发现参与率均达到100%。研究院独有的勘探开发一体化、处理解释一体化、前方后方一体化、科研生产一体化的技术优势和服务能力，为中国石油油气储量增长和高效勘探开发发挥了重要作用，为保障国家能源安全贡献了物探力量，得到了中国石油集团、各油气田公司、国内国际同行的充分肯定和高度评价。
              研究院将始终秉承“绿色发展，奉献能源”的宗旨，以建设国际一流综合性物探技术研究院为目标，全力打造物探科技策源地，一流人才创业园，以高新技术降低勘探风险，不断提升找油找气技术服务和市场竞争能力，努力实现研究院质量效益发展的新跨越。
            </span>
          </el-card>
          <el-card style="margin-top: 30px">
            <el-row :gutter="12" style="margin-top: 20px">
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">中心主任：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">副主任：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top: 30px">
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">办公室主任：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">办公室副主任：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top: 30px">
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">荣誉主任：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">中心主任助理：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top: 30px">
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">中心下设：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">行政人员：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top: 30px">
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">研究团队：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">支持人员：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top: 30px">
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">电话：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">邮箱：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
            </el-row>
            <el-row :gutter="12" style="margin-top: 30px">
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">网址：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
              <el-col :span="4">
                <div style="text-align: right"><span style="font-size: 20px">地址：</span></div>
              </el-col>
              <el-col :span="8"><span style="font-size: 20px">阿布扎比研究中心</span></el-col>
            </el-row>
            <el-row>
              <el-button type="primary" icon="plus" @click="true" style="margin-top: 50px">编 辑 </el-button>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="22" v-show="projectShow" style="margin-top: 10px">
          <div class="table-box">
            <ProTable ref="markTable" :columns="columns" :request-api="getTableList" :init-param="initParam"
              :data-callback="dataCallback">
              <!-- 方式 -->
              <!-- 工作性质 -->
              <template #workNature="scope">
                {{ showworkNature(scope.row.workNature) }}
              </template>
              <!-- 工区地表类型 -->
              <template #surfaceType="scope">
                {{ showsurfaceType(scope.row.surfaceType) }}
              </template>
              <!-- 是否PSTM -->
              <template #pstm="scope">
                {{ showyesno(scope.row.pstm) }}
              </template>
              <!-- 是否一体化 -->
              <template #integration="scope">
                {{ showyesno(scope.row.integration) }}
              </template>
            </ProTable>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="tsx" name="Table">
import { ref, reactive } from "vue";
import { Market } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getNewSignsByCenter, addMark, editMark, deleteMark } from "@/api/modules/market";

if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}
// ProTable 实例
const markTable = ref<ProTableInstance>();
// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

const infomationShow = ref(true);
const projectShow = ref(false);

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = async (params: any) => {
  params.key = "阿布扎比中心";
  let newParams = JSON.parse(JSON.stringify(params));
  console.log("newParams", newParams)
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return await getNewSignsByCenter(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 表格配置项
const columns = reactive<ColumnProps<Market.NewSignTable>[]>([
  { type: "index", label: "#", width: 80 },
  {
    prop: "area",
    label: "地区",
  },
  {
    prop: "country",
    label: "国家"
  },
  { prop: "workareaName", label: "工区名称", width: 120 },
  { prop: "lessor", label: "甲方" },
  { prop: "ourCompany", label: "我方签约公司名称", width: 220 },
  { prop: "signatoryName", label: "我方合同签字人姓名", width: 240 },
  { prop: "projectName", label: "项目名称", width: 120 },
  { prop: "contractNum", label: "合同号", width: 100 },
  { prop: "workNature", label: "工作性质", width: 120 },
  { prop: "integration", label: "是否一体化项目", width: 200 },
  { prop: "surfaceType", label: "工区地表类型", width: 160 },
  { prop: "pstm", label: "是否PSTM", width: 160 },
  { prop: "psdm", label: "是否PSDM", width: 160 },
  { prop: "workload_2d", label: "工作量2D", width: 140 },
  { prop: "workload_3d", label: "工作量3D", width: 140 },
  { prop: "contractAmount", label: "新签合同额(万美元)", width: 220 },
  { prop: "signDate", label: "合同签订日期", width: 160 },
  { prop: "closeDate", label: "合同关闭日期", width: 160 },
  { prop: "note", label: "备注", width: 160 },
  { prop: "key", label: "搜索", search: { el: "input" }, isShow: false },
]);

const workNature = [
  { label: "处理", value: 1 },
  { label: "解释", value: 2 },
  { label: "油藏", value: 3 },
  { label: "科研", value: 4 },
  { label: "服务", value: 5 }
];

const yesno = [
  { label: "是", value: 1 },
  { label: "否", value: 2 }
];

const surfaceType = [
  { label: "海洋", value: 1 },
  { label: "过渡带", value: 2 },
  { label: "陆地", value: 3 }
];

const showworkNature = (str: string) => {
  let tempstr = str.toString().split("");
  let res = "";
  for (let i = 0; i < tempstr.length; i++) {
    res = res + workNature[parseInt(tempstr[i]) - 1].label + " ";
  }
  return res;
};

const showyesno = (num: number) => {
  return num ? yesno[num - 1].label : undefined;
};

const showsurfaceType = (num: number) => {
  return num ? surfaceType[num - 1].label : undefined;
};

const getInfo = () => {
  infomationShow.value = true;
  projectShow.value = false;
};

const getProject = () => {
  infomationShow.value = false;
  projectShow.value = true;
};
</script>
