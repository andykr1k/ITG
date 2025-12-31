import { requireNativeView } from 'expo';
import * as React from 'react';

import { IntentsViewProps } from './Intents.types';

const NativeView: React.ComponentType<IntentsViewProps> =
  requireNativeView('Intents');

export default function IntentsView(props: IntentsViewProps) {
  return <NativeView {...props} />;
}
