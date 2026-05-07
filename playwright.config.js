// @ts-check
import { chromium, defineConfig, devices, expect, firefox } from '@playwright/test';


const config=({
  testDir: './tests',
  testMatch:'**/*.spec.js',
  timeout:40*1000,
  expect:{
    timeout:5000
  },
  reporter: 'html',
  
  use: {
    browserName:'chromium',
    headless:false
    
  },

  
});

module.exports=config

