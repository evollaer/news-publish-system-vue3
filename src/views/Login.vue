<template>
  <div>
    <!-- <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
      url="http://foo.bar/particles.json" /> -->

    <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
      :options="options" />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="80px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
          <el-button @click="resetForm(loginFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
// import { loadSlim } from "tsparticles-slim";
import { loadFull } from "tsparticles";
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore()

const options = {
  background: {
    color: {
      value: '#2d3a48'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 },
    }
  },
  detectRetina: true
}

const loginForm = reactive({
  username: '',
  password: ''
})
const loginFormRef = ref()

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  // age: [{ validator: checkAge, trigger: 'blur' }],
})


const router = useRouter()


const submitForm = (formEl) => {
  if (!formEl) return
  console.log(formEl);
  // formEl.validate((valid) => {
  //   if (valid) {
  //     console.log('submit!')
  //     localStorage.setItem('token', 'evollaer')
  //   } else {
  //     console.log('error submit!')
  //     return false
  //   }
  // })


  loginFormRef.value.validate((valid) => {
    console.log(valid);
    console.log(loginForm.username);
    if (valid) {
      console.log('通过');
      axios.post('/adminapi/user/login', loginForm).then(res => {
        console.log(res);
        if (res.data.ActionType == "OK") {
          console.log(res.data);
          store.commit("changeUserInfo", res.data.data)
          router.push('/index')
        } else {
          ElMessage.error(res.data.error)
        }
      })
    } else {
      console.log('不通过');
    }
  })
}

const particlesInit = async engine => {
  await loadFull(engine);
  // await loadSlim(engine);
};

const particlesLoaded = async container => {
  // await loadFull(container)
  console.log("Particles container loaded", container);
};
const handleLogin = () => {
  localStorage.setItem('token', 'evollaer')
}
</script>
<style lang="scss" scoped>
.formContainer {
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: rgba($color: #000000, $alpha: 0.5);
  color: #fff;
  text-align: center;

  h3 {
    font-size: 30px;
    margin-bottom: 20px;
  }
}

::v-deep .el-form-item__label {
  color: #fff;
}
</style>
