import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Intents.types';

type IntentsModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class IntentsModule extends NativeModule<IntentsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(IntentsModule, 'IntentsModule');
