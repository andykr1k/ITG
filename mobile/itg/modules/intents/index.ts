// Reexport the native module. On web, it will be resolved to IntentsModule.web.ts
// and on native platforms to IntentsModule.ts
export { default } from './src/IntentsModule';
export { default as IntentsView } from './src/IntentsView';
export * from  './src/Intents.types';
