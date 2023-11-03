<template>
  <div class="auth">
    <div class="overlay"></div>
    <div class="auth-modal">
      <router-link class="auth-modal-change_auth" :to="changeAuthLink">
        {{ changeAuthText }}
      </router-link>

      <p class="auth-title">{{ title }}</p>
      <form class="auth-form" @submit.prevent="submitHandler">
        <div class="auth-form-field">
          <input
            type="text"
            class="auth-form-input"
            :class="{
              invalid: errors.login,
            }"
            v-model="login"
            placeholder="Логин"
            @input="resetLoginError"
          />
          <span class="auth-form-error" v-if="errors.login">{{
            errors.login
          }}</span>
        </div>
        <div class="auth-form-field">
          <input
            type="password"
            class="auth-form-input"
            :class="{
              invalid: errors.password,
            }"
            v-model="password"
            placeholder="Пароль"
            @input="resetPasswordError"
          />
          <span class="auth-form-error" v-if="errors.password">{{
            errors.password
          }}</span>
        </div>
        <label for="is-agree" class="checkbox-label" v-if="!isLogin">
          <input type="checkbox" :checked="isAgree" id="is-agree" hidden />
          <span>Я согласен получать обновления на почту</span>
        </label>
        <span
          v-if="status.message"
          class="auth-main-error"
          :class="status.isValid ? 'success' : 'error'"
          >{{ status.message }}</span
        >
        <div class="auth-button-wrap">
          <ColorButton :text="buttonText" color="orange" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import ColorButton from "@/components/ColorButton.vue";
import { generalLocalStorageKey, loginUser, registerUser } from "@/api/api";
import router from "@/router";

const schema = yup.object().shape({
  login: yup
    .string()
    .required("Введите логин")
    .min(5, "Логин должен содержать не менее 5 символов")
    .max(25, "Логин должен содержать не более 25 символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен содержать не менее 8 символов")
    .max(25, "Пароль должен содержать не более - 25 символов"),
});

export default {
  name: "AuthView",
  components: { ColorButton },
  data() {
    return {
      login: "",
      password: "",
      isAgree: false,
      errors: {
        login: null,
        password: null,
      },
      status: {
        isValid: true,
        message: "",
      },
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
    changeAuthLink() {
      return this.isLogin ? "/register" : "/login";
    },
    changeAuthText() {
      return this.isLogin ? "Зарегистрироваться" : "Авторизоваться";
    },
    title() {
      return this.isLogin ? "Вход" : "Регистрация";
    },
    buttonText() {
      return this.isLogin ? "Войти" : "Зарегистрироваться";
    },
  },
  methods: {
    async submitHandler() {
      await this.validate();

      if (this.errors.login || this.errors.password) return;

      let result;

      if (this.isLogin) {
        result = this.userLogin();
      } else {
        result = this.userRegister();
      }

      if (!result.success) {
        this.status.isValid = false;
        this.status.message = result.message;
        return;
      }

      this.status.isValid = true;
      this.status.message = result.message;

      setTimeout(() => router.push("/"), 2000);
    },

    userLogin() {
      return loginUser({
        name: this.login,
        password: this.password,
      });
    },

    userRegister() {
      return registerUser({
        name: this.login,
        password: this.password,
      });
    },

    async validate() {
      try {
        await schema.validate(
          {
            login: this.login,
            password: this.password,
          },
          { abortEarly: false }
        );
      } catch (e) {
        const errors = e.inner;

        if (!errors.length) {
          this.errors = {};
        } else {
          this.errors.login = errors.find(
            (error) => error?.path === "login"
          )?.errors[0];
          this.errors.password = errors.find(
            (error) => error?.path === "password"
          )?.errors[0];
        }
      }
    },

    resetLoginError() {
      this.errors.login = null;
    },

    resetPasswordError() {
      this.errors.password = null;
    },
  },
  mounted() {
    const restaurantData = JSON.parse(
      window.localStorage.getItem(generalLocalStorageKey)
    );

    if (restaurantData?.activeUser?.id) router.push("/");
  },
};
</script>

<style scoped>
.auth {
  background-image: url("@/assets/auth-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.45);
}

.auth-modal {
  position: relative;
  z-index: 2;
  background-color: #fff;
  padding: 36px 20px 34px;
  border-radius: 6px;
  max-width: 460px;
  width: 100%;
}

.auth-title {
  margin-bottom: 36px;
  text-align: center;
  text-transform: uppercase;
  font-size: 31px;
  font-weight: bold;
}

.auth-modal-change_auth {
  position: absolute;
  display: block;
  top: 7px;
  left: auto;
  right: 20px;
  text-decoration: underline;
  font-size: 12px;
  font-weight: 300;
  color: var(--orange-color);
}

.auth-form {
  display: grid;
  row-gap: 15px;
}

.auth-form-input.invalid {
  border-color: var(--red-color);
}

.auth-form-input {
  display: block;
  background-color: #fff;
  border: 1px solid var(--orange-color);
  border-radius: 60px;
  padding: 9px 18px 10px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

.checkbox-label {
  display: block;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
}

.checkbox-label span {
  position: relative;
  display: block;
  padding: 2px 0 2px 27px;
  text-align: left;
  user-select: none;
}

.checkbox-label span:before {
  content: " ";
  box-sizing: border-box;
  display: block;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 1px solid var(--orange-color);
}

.checkbox-label span:after {
  content: none;
  box-sizing: border-box;
  display: block;
  width: 10px;
  height: 10px;
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: var(--orange-color);
}

.checkbox-label input:checked + span:after {
  content: " ";
}

.auth-button-wrap {
  padding-top: 13px;
}

.auth-form-error {
  color: var(--red-color);
  text-align: left;
  position: absolute;
  left: 18px;
  top: 102%;
  font-weight: 300;
  font-size: 12px;
}

.auth-main-error {
  text-align: left;
  font-weight: 300;
  font-size: 12px;
}

.auth-main-error.success {
  color: green;
}

.auth-main-error.error {
  color: var(--red-color);
}

.auth-form-field {
  position: relative;
}
</style>
