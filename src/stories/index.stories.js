/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { withReadme, withDocs } from "storybook-readme";
import { linkTo } from "@storybook/addon-links";

import MyButton from "../components/MyButton.vue";
import MyButtonWithRequest from "../components/MyButtonWithRequest.vue";

// // 1. import axios and MockAdapter
import axios from "axios";

import MockAdapter from "axios-mock-adapter";
import mockResponse from "@/stories/data/mock-response.json";
import storiesReadmeExample from "@/stories/storiesReadmeExample.md";

const API_REQUEST = "https://swapi.co/api/planets/1";

// 2. create the mock
const mock = new MockAdapter(axios);

storiesOf("examples", module)
  .add("with text", () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action("clicked") }
  }))
  .add("with JSX", () => ({
    components: { MyButton },
    render() {
      return <my-button onClick={this.action}>With JSX</my-button>;
    },
    methods: { action: linkTo("Button", "with some emoji") }
  }))
  .add("with some emoji", () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action("clicked") }
  }))
  .add(
    "with readme on story panel",
    withReadme(storiesReadmeExample, () => ({
      components: { MyButton },
      template: '<my-button @click="action">Hello Button</my-button>',
      methods: { logEvent: action("click") }
    }))
  )
  .add(
    "with readme on main panel",
    withDocs(storiesReadmeExample, () => ({
      components: { MyButton },
      template: '<my-button @click="action">Hello Button</my-button>',
      methods: { logEvent: action("click") }
    }))
  )
  .add(
    "element with notes",
    () => ({
      components: { MyButton },
      template: '<my-button @click="action">Hello Button</my-button>',
      methods: { logEvent: action("click") }
    }),
    {
      notes: { markdown: storiesReadmeExample }
    }
  )
  .add("element with mock request", () => {
    // Mock any GET request to /users
    // arguments for reply are (status, data, headers)
    mock.onGet(API_REQUEST).reply(200, mockResponse);

    return {
      components: { MyButtonWithRequest },
      template: '<my-button-with-request @click="logEvent">Hello Button</my-button-with-request>',
      methods: { logEvent: action("click") }
    };
  })
  .add("with knobs", () => ({
    components: { MyButton },
    template:
      '<my-button @click="logEvent" :name="name">Hello Button</my-button>',
    data() {
      return {
        name: text("name", 'Conor Jon')
      };
    },
    methods: { logEvent: action("click") }
  }));
