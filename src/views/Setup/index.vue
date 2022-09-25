<template>
  <div class="setup">
    <el-card :body-style="{ height: '600px' }">
      <template #header>
        <div class="flex justify-between">
          <div>修改信息</div>
        </div>
      </template>
      <el-form :model="form" class="fromBorder mt-12">
        <el-row :gutter="10" class="w-full">
          <el-col>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="http://124.223.81.104:3000/down/img"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="img.image" :src="img.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="w-full">
          <el-col :span="6" :sm="7">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" :sm="7">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="性别">
                <el-option
                  v-for="item in meunSex()"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :sm="7">
            <el-form-item label="地址">
              <el-input
                v-model="form.address"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="w-full">
          <el-col :span="6" :sm="7">
            <el-form-item label="vip">
              <el-select v-model="form.vip" placeholder="请输入vip">
                <el-option
                  v-for="item in setVip()"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :sm="7">
            <el-form-item label="邮箱">
              <el-input v-model="form.emit" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :sm="7">
            <el-form-item label="手机号">
              <el-input
                v-model="form.plone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="w-full">
          <el-col :span="6" :sm="7">
            <el-form-item label="账户余额￥">
              <el-input
                disabled
                type="Number"
                v-model="form.wallet"
                placeholder="拥有的金额"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" :sm="7">
            <el-form-item label="出生年月">
              <el-date-picker
                v-model="form.birth"
                type="date"
                placeholder="请输入出生年月"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :sm="7">
            <el-form-item label="修改密码">
              <el-input
                maxlength="18"
                v-model="form.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="w-full mt-6">
          <el-col :span="6" :sm="8">
            <el-form-item label="操作">
              <el-button type="primary" @click="handerOk(form)"
                >确定修改</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
//公共引用vue
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { ElMessage, UploadProps } from "element-plus";
//api
import { Getinfo, Postputinfo } from "@/api/user/user";
// 引入数组，格式化
import { setVip, meunSex } from "@/utils/common/selectmenu/selectListQuery";
export default defineComponent({
  name: "seUp",
  setup() {
    // ---------------------------初始化数据--------------------------
    let form = ref({
      password: "",
      headlogo: "",
      address: "",
      wallet: "",
      birth: "",
      plone: "",
      name: "",
      emit: "",
      sex: "",
      vip: "",
    });
    const img = reactive({
      image: "",
    });

    // ---------------------------获取数据区--------------------------
    //1.获取列表
    const getlist = async () => {
      try {
        const res = await Getinfo();
        form.value = res.data;
        img.image = res.data.headlogo;
      } catch (e) {
        ElMessage.error("获取数据失败");
      }
    };

    // ---------------------------操作数据区--------------------------
    //2.功能点上传图片
    const handleAvatarSuccess: UploadProps["onSuccess"] = (
      response,
      uploadFile
    ) => {
      img.image = URL.createObjectURL(uploadFile.raw!);
      img.image = response.data.image;
    };
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

    /* 修改数据 */
    const handerOk = async (data: any) => {
      try {
        data.headlogo = img.image;
        const res = await Postputinfo(data);
        ElMessage.success("操作成功");
        getlist();
      } catch {
        ElMessage.error("操作失败");
      }
    };

    onMounted(() => {
      getlist();
    });
    return {
      handleAvatarSuccess,
      beforeAvatarUpload,
      handerOk,
      meunSex,
      setVip,
      form,
      img,
    };
  },
});
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
  // border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.el-form-item__label {
  width: 100px !important;
  display: flex !important;
  align-self: center !important;
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
</style>
