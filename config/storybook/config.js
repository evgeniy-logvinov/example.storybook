/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator, configure } from '@storybook/vue'
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withOptions } from '@storybook/addon-options';
import { withNotes } from "@storybook/addon-notes";
import { withKnobs } from "@storybook/addon-knobs";
import { withViewport } from '@storybook/addon-viewport';
import { MainDecorator } from './decorators';
import { withBackgrounds } from '@storybook/addon-backgrounds';

import Vue from 'vue';
import store from "@/store";

import withBackgroundsOptions from './options/withBackgrounds.js';
import withOptionsOptions from './options/withOptions.js';

Vue.prototype.$store = store;

addDecorator(withViewport);
addDecorator(withKnobs);
addDecorator(withNotes);
addDecorator(MainDecorator)
addDecorator(withBackgrounds(withBackgroundsOptions));
addDecorator(withOptions(withOptionsOptions));

const newViewports = {
  simple: {
    name: 'simple',
  },
};

configureViewport({
  defaultViewport: 'simple',
  viewports: {
    ...INITIAL_VIEWPORTS,
    ...newViewports
  }
});

const req = require.context('../../src/stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
