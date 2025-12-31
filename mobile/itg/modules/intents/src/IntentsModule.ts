import { NativeModule, requireNativeModule } from 'expo';

import { IntentsModuleEvents } from './Intents.types';

declare class IntentsModule extends NativeModule<IntentsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<IntentsModule>('Intents');
