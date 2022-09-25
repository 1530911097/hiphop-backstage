<template>
  <el-card :body-style="{ height: '100%' }">
    <!--顶部标题  -->
    <template #header>
      <div class="flex justify-between">
        <div>学员管理</div>
        <div>
          <el-button type="primary" @click="handleSave('add')">新增</el-button>
        </div>
      </div>
    </template>

    <!-- 查询区 -->
    <el-form :model="searchForm" class="fromBorder mb-2">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input
              v-model="searchForm.student_name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="舞种分类">
            <el-select
              v-model="searchForm.student_species"
              placeholder="输入舞种分类"
            >
              <el-option
                v-for="item in meunDance()"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="searchForm.student_sex" placeholder="性别">
              <el-option
                v-for="item in meunSex()"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="seatch">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 展示区 -->
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="student_name" label="名称" width="120" />
      <el-table-column prop="student_number" label="学号" width="120" />
      <el-table-column
        prop="student_sex"
        label="性别"
        width="80"
        align="center"
      >
        <template v-slot="{ row }">
          {{ formatSex(null, null, row.student_sex) }}
        </template>
      </el-table-column>

      <el-table-column
        prop="student_species"
        align="center"
        label="舞种分类"
        width="180"
      />
      <el-table-column
        prop="student_date"
        align="center"
        label="生日"
        width="180"
      />

      <el-table-column
        prop="student_introduction"
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
      <el-form-item label="学号" prop="student_number">
        <el-input
          v-model="form.student_number"
          placeholder="请输入学号"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="student_name">
        <el-input
          v-model="form.student_name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="student_sex">
        <el-select v-model="form.student_sex" placeholder="请选择性别">
          <el-option
            v-for="item in meunSex()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="生日" prop="student_date">
        <el-date-picker
          v-model="form.student_date"
          type="date"
          placeholder="请输入出生年月"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="分类" prop="student_dance_species">
        <el-select v-model="form.student_species" placeholder="输入舞种分类">
          <el-option
            v-for="item in meunDance()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="student_Introduction">
        <el-input
          type="textarea"
          v-model="form.student_introduction"
          placeholder="输入说明"
        ></el-input>
      </el-form-item>
      <el-form-item>
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

//引入数组，格式化
import { formatSex } from "@/utils/common/format/sexformat";
import { meunSex, meunDance } from "@/utils/common/selectmenu/selectListQuery";
//api
import {
  GetStudentList,
  PostStudentAdd,
  POSTStudentRemove,
  POSTStudentUpdata,
  PostStudentlist,
} from "@/api/student/student";

// 查询列表参数
interface listParams {
  student_name?: string;
  student_sex?: string;
  student_species?: string;
}

export default defineComponent({
  setup() {
    // ---------------------------初始化数据--------------------------
    const addVisable = ref(false);
    const loading = ref(true);
    const title = ref();
    const tableData = ref();
    const page = reactive({
      pageSize: 10,
      pageNum: 1,
      total: 0,
    });
    const searchForm = reactive({
      student_species: "",
      student_name: "",
      student_sex: "",
    });

    let form = reactive({
      student_introduction: "",
      student_species: "",
      student_number: "",
      student_date: "",
      student_name: "",
      student_sex: "",
      id: "",
    });

    // ---------------------------获取数据区--------------------------
    //1.获取列表
    const getlist = async () => {
      try {
        const res = await GetStudentList(page);
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
    //2.功能点搜索
    const seatch = async (data: any) => {
      if (
        searchForm.student_species == "" &&
        searchForm.student_name == "" &&
        searchForm.student_sex == ""
      ) {
        getlist();
      } else {
        handleseatch();
      }
    };
    async function handleseatch() {
      const query: listParams = {};
      let val: any;
      let key: keyof typeof searchForm;
      for (key in searchForm) {
        val = searchForm[key];
        if (val === val && val !== "") {
          query[key] = val;
        }
      }
      const res = await PostStudentlist({
        ...query,
      });
      tableData.value = res.data;
    }

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
          const result = await PostStudentAdd(form);
          ElMessage.success(result.message);
          getlist();
        } catch (e: any) {
          ElMessage.error(e.response.data.message);
        } finally {
          addVisable.value = false;
        }
      } else {
        try {
          const result = await POSTStudentUpdata(form);
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
        const result = await POSTStudentRemove({ id: data.id });
        ElMessage.success(result.message);
        getlist();
      } catch (e) {
        ElMessage.error("删除失败");
      } finally {
        addVisable.value = false;
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
      handeldelete,
      handlereset,
      handleEdit,
      formatSex,
      handleSave,
      handelsave,
      seatch,
      meunSex,
      meunDance,
      searchForm,
      addVisable,
      tableData,
      loading,
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
</style>
