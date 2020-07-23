import Vue from "vue";
import { shallowMount, mount } from "@vue/test-utils";
import Login from "@/views/Login.vue";

import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Login.vue", () => {
  const fakeGqlData={
    data:{
      login:{
        jwt:"123456",
        user:{
          email:"email",
          username:"username",
          password:"password"
        }
      }
     }
  };


  it("should containt input fields", () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.find('[data-testid="loginField"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="passwordField"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="connexionBtn"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="errorMsg"]').exists()).toBe(false);
  });

  it("should display success message", async () => {
    const wrapper = mount(Login);
    await wrapper.setData({successMsg:"Authorisation ok! "});
    expect(wrapper.find('[data-testid="successMsg"]').exists()).toBe(true);
  });

  it("should display error message", async () => {
    const wrapper = mount(Login);
    await wrapper.setData({errorMsg:"Fail ! "});
    expect(wrapper.find('[data-testid="errorMsg"]').exists()).toBe(true);
  });

  it("should authorize access", async () => {
    const wrapper = mount(Login);
    const form = wrapper.find('[data-testid="connexionForm"]');

    (wrapper.vm as any).connectWithGraphQL=jest.fn(()=>fakeGqlData);
    (wrapper.vm as any).storeUserInVuex=jest.fn();

    await form.trigger("submit");
    expect((wrapper.vm as any).connectWithGraphQL).toHaveBeenCalled()
    expect((wrapper.vm as any).storeUserInVuex).toHaveBeenCalled()
    expect((wrapper.vm as any).successMsg).toBeTruthy()
  });


  it("should deny access", async () => {
    const wrapper = mount(Login);

    // const inputLogin = wrapper.find('[data-testid="loginField"]');
    // inputLogin.setValue("fab.grignoux@gmail.com");

    // const inputPassword = wrapper.find('[data-testid="passwordField"]');
    // inputPassword.setValue("123456");

    const form = wrapper.find('[data-testid="connexionForm"]');

    (wrapper.vm as any).connectWithGraphQL=jest.fn(()=> {throw new Error()});

    await form.trigger("submit");
    expect((wrapper.vm as any).connectWithGraphQL).toHaveBeenCalled()
    expect(wrapper.find('[data-testid="errorMsg"]').exists()).toBe(true);
  });






  it("should return a user object",()=>{
    const wrapper:any = shallowMount(Login);

    const user = wrapper.vm.buildUser(fakeGqlData)
    expect(user).toEqual( 
      {
        token:"123456",
        email:"email",
        username:"username",
      } 
    )
  })
});
