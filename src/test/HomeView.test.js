import { mount } from "@vue/test-utils";
import { computed } from "vue";
import { test, vi, describe, expect } from "vitest";
import HomeView from "../views/HomeView.vue";

import * as todosSetup from "../todosSetup";

const setupMock = {
  todosIncompleted: computed(() => []),
  todosCompleted: computed(() => []),
  toggle: vi.fn(),
  deleteTodo: vi.fn(),
  add: vi.fn(),
};

describe("HelloView.vue tests", () => {
  test("Title exists", () => {
    const wrapper = mount(HomeView);

    expect(wrapper.text()).toContain("To Do List");
  });

  test("List is empty", () => {
    const spy = vi.spyOn(todosSetup, "todosFactory").mockReturnValue({
      ...setupMock,
    });
    const wrapper = mount(HomeView);

    expect(wrapper.text()).toContain("To Do List");
    expect(wrapper.text()).toContain("Nothing for to do!");
  });

  test("List has incompleted todos", () => {
    const spy = vi.spyOn(todosSetup, "todosFactory").mockReturnValue({
      ...setupMock,
      todosIncompleted: computed(() => [
        { id: 1, name: "Learn", completed: false },
      ]),
    });

    const wrapper = mount(HomeView);

    expect(wrapper.text()).not.toContain("Nothing for to do!");

    const uls = wrapper.findAll("ul");
    expect(uls[0].attributes().id).toContain("incomplete-tasks");
    expect(uls[0].text()).toContain("Learn");

    expect(uls[1].attributes().id).toContain("completed-tasks");
    expect(uls[1].text()).toBe("");
  });

  test("List has completed todos", () => {
    const spy = vi.spyOn(todosSetup, "todosFactory").mockReturnValue({
      ...setupMock,
      todosCompleted: computed(() => [
        { id: 1, name: "Learn", completed: true },
      ]),
    });

    const wrapper = mount(HomeView);
    expect(wrapper.text()).toContain("Nothing for to do!");

    const uls = wrapper.findAll("ul");
    expect(uls[0].attributes().id).toContain("incomplete-tasks");
    expect(uls[0].text()).toBe("");

    expect(uls[1].attributes().id).toContain("completed-tasks");
    expect(uls[1].text()).toContain("Learn");
  });

  test("Toggle works", async () => {
    const mock = {
      ...setupMock,
      todosIncompleted: computed(() => [
        { id: 1, name: "Learn", completed: true },
      ]),
    };
    const toggleSpy = vi.spyOn(mock, "toggle");
    const spy = vi.spyOn(todosSetup, "todosFactory");
    spy.mockReturnValue(mock);

    const wrapper = mount(HomeView);

    expect(wrapper.text()).not.toContain("Nothing for to do!");

    const uls = wrapper.findAll("ul");
    expect(uls[0].attributes().id).toContain("incomplete-tasks");
    expect(uls[0].text()).toContain("Learn");

    expect(uls[1].attributes().id).toContain("completed-tasks");
    expect(uls[1].text()).toBe("");

    await wrapper.find("li").trigger("click");

    expect(toggleSpy).toHaveBeenCalled();
  });
});
