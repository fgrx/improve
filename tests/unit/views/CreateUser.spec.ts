import Vue from 'vue';
import { shallowMount, mount } from "@vue/test-utils";
import CreateUser from '@/views/CreateUser.vue';
import Vuetify from "vuetify";
Vue.use(Vuetify);


const fillTheForm=async function(wrapper){
    await wrapper.find('[data-testid="emailField"]').setValue("test@free.fr")
    await wrapper.find('[data-testid="usernameField"]').setValue("test")
    await wrapper.find('[data-testid="passwordField"]').setValue("test123456789")
}

describe('CreateUser.vue', () => {
    it('should display component', () => {
        const wrapper = shallowMount(CreateUser)
        expect(wrapper.find('[data-testid="title"]').exists()).toBeTruthy()
        expect(wrapper.find('[data-testid="form"]').exists()).toBeTruthy()
        expect(wrapper.find('[data-testid="connexionBtn"]').exists()).toBeTruthy()
    });

    it("should not be clickable",()=>{
        const wrapper=shallowMount(CreateUser)
        expect(wrapper.find('[data-testid="connexionBtn"]').attributes('disabled')).toBeTruthy()
    })

    it("should be clickable",async ()=>{
        const wrapper = mount(CreateUser)

        await fillTheForm(wrapper)

        await Vue.nextTick()
        expect(wrapper.find('[data-testid="connexionBtn"]').attributes('disabled')).toBeFalsy()
    })


    it("should return that the user exist",async ()=>{
        const wrapper = mount(CreateUser);

        const mockCheckIfUserExist =  jest.fn(()=>true);
        (wrapper.vm as any).checkIfUserExist=mockCheckIfUserExist
        
        await fillTheForm(wrapper)

        await wrapper.find('[data-testid="form"]').trigger("submit");
        expect((wrapper.vm as any).checkIfUserExist).toHaveBeenCalled()
        expect(wrapper.find('[data-testid="errorMsg"]').exists()).toBeTruthy()
    })

    it("should create user",async()=>{
        const wrapper = mount(CreateUser);
        (wrapper.vm as any).checkIfUserExist=jest.fn(()=>false);
        (wrapper.vm as any).createUserInDB= jest.fn(()=>true);
        (wrapper.vm as any).email="test123@free.Fr";
        (wrapper.vm as any).password="13245687";
        (wrapper.vm as any).username="test";
        await (wrapper.vm as any).createUserAction()
        expect((wrapper.vm as any).createUserInDB).toHaveBeenCalled()
        expect(wrapper.find('[data-testid="successMsg"]').exists()).toBeTruthy()
    })
 

});