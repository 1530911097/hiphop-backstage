import { createStore } from "vuex";
import {
  getToken, setUser, getUser
} from '@/utils/user'

export default createStore({
  state: {
    token: '' || getToken(),
    userinfo:{} || getUser() 
  },
  getters: {},
  mutations: {
    getInfo(state, info) {
      state.token = info
    },
    useinfo(state, info) {
      state.userinfo = info
      setUser(info)
    }
  },
  actions: {
  
  },
  modules: {


  },
});
