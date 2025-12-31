import * as React from 'react';

import { IntentsViewProps } from './Intents.types';

export default function IntentsView(props: IntentsViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
