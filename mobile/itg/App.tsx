import { CreateGoal } from 'pages';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <CreateGoal/>
      </View>
    </SafeAreaProvider>
  );
}
