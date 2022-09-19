<template>
  <div class="h-100 d-flex align-items-center justify-content-center">
    <div class="card mx-auto" style="width: 500px">
      <div class="card-body text-center card-body-login" v-loading="loading">
        <div class="client-logo">
          <img src="@/assets/DocQ-Icon.png" alt="DocQ logo" style="height: 90px" />
        </div>

        <div class="my-4">
          <h1>Welcome</h1>

          <button type="button" class="btn btn-outline-secondary mt-2 w-100 fs-4" @click="loginWithGoogleAuth()">
            Sign in with Google
          </button>

          <el-divider content-position="center"><span class="fw-bold">or</span></el-divider>
        </div>

        <form>
          <div class="mb-3 text-start">
            <h4 class="fw-bold">Username</h4>
            <el-input v-model="username" placeholder="Username" clearable @keyup.enter="login()" />
          </div>

          <div class="mb-3 text-start">
            <h4 class="fw-bold">Password</h4>
            <el-input
              v-model="password"
              type="password"
              placeholder="Password"
              autocomplete="current-password"
              show-password
              @keyup.enter="login()"
            />
          </div>

          <button type="button" class="btn btn-primary mt-4 w-100" @click="login()">Sign In</button>
        </form>

        <button type="button" class="btn btn-sm btn-link text-primary mt-2">Forgot your password?</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useGetters, useMutations } from '@/helper/vuex'
  import api from '@/helper/api'
  import { ElMessage } from 'element-plus'

  // variable
  let loading = ref<boolean>(false)
  let username = ref<string>('')
  let password = ref<string>('')
  // function
  const { setUser } = useMutations(['setUser'])
  const login = () => {
    loading.value = true
    api.login(username.value, password.value).then(
      (resp) => {
        userLoggedIn(resp)
        loading.value = false
      },
      (err) => {
        ElMessage.error('Invalid email/password. Please try again.')
        console.log(err)
        loading.value = false
      },
    )
  }
  const loginWithGoogleAuth = () => {
    api.loginByGoogleOAuth().then(
      (resp) => {
        userLoggedIn(resp)
      },
      (err) => {
        console.log(err)
      },
    )
  }
  const userLoggedIn = (resp) => {
    setUser(JSON.stringify(resp.user))
    ElMessage.success('Congrats, this is a success message.')
    nextPage()
  }

  /* Route */
  const router = useRouter()
  const route = useRoute()
  const nextPage = () => {
    const routeFallback = () => {
      router.replace({ path: '/' as string })
    }

    if (route.query.redirect) {
      router.replace({ path: route.query.redirect as string }).catch(() => routeFallback())
    } else routeFallback()
  }
</script>

<style scoped></style>
