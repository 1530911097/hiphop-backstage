<template>
  <el-card :body-style="{ height: '100%' }">
    <!--顶部标题  -->
    <template #header>
      <div class="flex justify-between">
        <div>轮播图管理</div>
        <div>
          <el-button type="primary" @click="handleSave('add')">新增</el-button>
        </div>
      </div>
    </template>

    <!-- 展示区 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column align="center" prop="picture" label="轮播图" width="200">
        <template v-slot="{ row }">
          <img :src="row.picture" class="pictureImg" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="state" label="状态" width="120">
        <template v-slot="{ row }">
          <div v-if="row.state === '0'">启动</div>
          <div v-if="row.state === '1'">禁用</div>
        </template>
      </el-table-column>
      <el-table-column prop="link" align="center" label="跳转链接" />

      <el-table-column
        prop="introduction"
        align="center"
        label="说明"
        :show-overflow-tooltip="true"
        width="auto"
      />
      <el-table-column
        fixed="right"
        prop="date"
        label="操作"
        width="180"
        align="center"
      >
        <template v-slot="{ row }">
          <el-button type="primary" @click="handleSave('edit', row)"
            >编辑</el-button
          >
          <el-popconfirm @confirm="handeldelete(row)" title="确认删除?">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center mt-5">
      <el-pagination
        background
        v-model:currentPage="page.pageNum"
        v-model:page-size="page.pageSize"
        layout="prev, pager, next"
        :total="page.total"
      />
    </div>
  </el-card>
  <!-- 弹框区(增/修) -->
  <el-dialog
    custom-class="dialogItem"
    width="550px"
    v-model="addVisable"
    :title="title"
  >
    <el-form :model="form" class="px-12" label-width="100px">
      <el-form-item label="轮播图" prop="picture">
        <el-upload
          class="avatar-uploader"
          action="http://124.223.81.104:3000/down/img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.picture" :src="form.picture" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state" placeholder="请选择状态">
          <el-option
            v-for="item in Selectoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="form.link" placeholder="输入说明"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="introduction">
        <el-input
          type="textarea"
          v-model="form.introduction"
          placeholder="输入说明"
        ></el-input>
      </el-form-item>
      <el-form-item fixed="right">
        <el-button class="w-36 mt-2" type="primary" @click="handelsave(form)"
          >确认</el-button
        >
        <el-button class="w-36 mt-2" @click="addVisable = false"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
//公共引用vue
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
//api
import {
  GetChartlist,
  PostChartAdd,
  POSTChartUpdata,
  POSTCharRemove,
} from "@/api/chart/chart";
import type { UploadProps } from "element-plus";

// 查询列表参数
interface listParams {
  teache_name?: string;
  teache_sex?: string;
  teache_dance_species?: string;
}

export default defineComponent({
  setup() {
    // ---------------------------初始化数据--------------------------
    const addVisable = ref(false);
    const loading = ref(true);
    const imageUrl = ref();
    const tableData = ref();
    const title = ref();
    const page = reactive({
      pageSize: 10,
      pageNum: 1,
      total: 0,
    });

    let form = reactive({
      introduction: "",
      picture: "",
      state: "",
      link: "",
      sex: "",
      id: "",
    });

    const Selectoptions = [
      {
        value: "0",
        label: "启动",
      },
      {
        value: "1",
        label: "关闭",
      },
    ];

    // ---------------------------获取数据区--------------------------
    //1.获取列表
    const getlist = async () => {
      try {
        const res = await GetChartlist(page);
        tableData.value = res.data;
        page.total = res.total;
        loading.value = true;
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    };

    // ---------------------------操作数据区--------------------------
    // ---------------------------重置对象--------------------------
    const handlereset = () => {
      Object.keys(form as unknown as keyof typeof form).forEach(function (key) {
        form[key] = "";
      });
    };
    //---------------------------编辑赋值--------------------------
    const handleEdit = (data: any) => {
      Object.keys(form as unknown as keyof typeof form).forEach(function (key) {
        form[key] = data[key];
      });
    };

    //---------------------------图片上传--------------------------
    const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
      if (rawFile.type !== "image/jpeg") {
        ElMessage.error("Avatar picture must be JPG format!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
        return false;
      }
      return true;
    };
    //---------------------------图片赋值--------------------------
    const handleAvatarSuccess: UploadProps["onSuccess"] = (
      response,
      uploadFile
    ) => {
      form.picture = URL.createObjectURL(uploadFile.raw!);
      form.picture = response.data.image;
    };
    //-----------------------列表弹框(新增-编辑)-------------------------
    const handleSave = async (state: any, data: any) => {
      addVisable.value = true;
      if (state === "add") {
        title.value = "新增";
        handlereset();
      } else if (state === "edit") {
        title.value = "编辑";
        handleEdit(data);
      }
    };
    //---------------------------新增-vs-修改--------------------------
    const handelsave = async (data: any) => {
      if (!data.id) {
        try {
          const result = await PostChartAdd(form);
          ElMessage.success(result.message);
          getlist();
        } catch {
          ElMessage.error("操作失败");
        } finally {
          addVisable.value = false;
        }
      } else {
        try {
          const result = await POSTChartUpdata(form);
          ElMessage.success(result.message);
          getlist();
        } catch {
          ElMessage.error("操作失败");
        } finally {
          addVisable.value = false;
        }
      }
    };

    //---------------------------列表删除--------------------------
    const handeldelete = async (data: any) => {
      try {
        const result = await POSTCharRemove({ id: data.id });
        ElMessage.success(result.message);
      } catch (e) {
        ElMessage.error("删除失败");
      } finally {
        getlist();
      }
    };

    //---------------------------数据更新--------------------------
    watch([() => page.pageSize, () => page.pageNum], () => {
      getlist();
    });
    onMounted(() => {
      getlist();
    });
    return {
      handleAvatarSuccess,
      beforeAvatarUpload,
      handeldelete,
      handlereset,
      handleEdit,
      handleSave,
      handelsave,
      Selectoptions,
      addVisable,
      tableData,
      loading,
      imageUrl,
      title,
      page,
      form,
    };
  },
});
</script>

<style lang="less">
:deep(.fromBorder) {
  border: 1px soild #2349a3 !important;
}

.el-dialog {
  border-radius: 8px !important;
}
.avatar-uploader .el-upload {
  transition: var(--el-transition-duration-fast);
  border: 1px dashed var(--el-border-color);
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
}
.el-form-item__label {
  align-self: center !important;
  display: flex !important;
  width: 100px !important;
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.avatar {
  width: 350px;
  height: 200px;
}
.pictureImg {
  border-radius: 10px;
  height: 100px;
  width: 200px;
}
.el-icon.avatar-uploader-icon {
  text-align: center;
  color: #8c939d;
  font-size: 28px;
  height: 100px;
  width: 100px;
}
</style>
