import { mount } from '@vue/test-utils'
import { test, describe, expect } from 'vitest';
import HomeView from '../views/HomeView.vue'
import {todosFactory} from '../todosSetup';
import todosMock from '../mock/todos';

describe('HelloView.vue integration tests', ()=> {
  test('Title exists', () => {
    const wrapper = mount(HomeView);

    expect(wrapper.text()).toContain('To Do List');
  });

  test('Todo is completable', async () => {
    const {update} = todosFactory();
    update(todosMock);

    const wrapper = mount(HomeView);

    expect(wrapper.text()).not.toContain('Nothing for to do!');
    
    const uls = wrapper.findAll('ul');
    expect(uls[0].attributes().id).toContain('incomplete-tasks');
    expect(uls[0].text()).toContain('Learn');

    expect(uls[1].attributes().id).toContain('completed-tasks');
    expect(uls[1].text()).toBe('');

    await wrapper.find('li').trigger('click');

    expect(uls[0].text()).not.toContain('Learn');
    expect(uls[1].text()).toContain('Learn');
  });
});