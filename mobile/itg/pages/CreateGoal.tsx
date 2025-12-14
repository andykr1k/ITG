import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Path } from "react-native-svg";
import { sendGoal } from "../functions/SendGoal";

export default function CreateGoal() {
  const [goal, setGoal] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "What's your goal?", isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = goal.trim().length === 0 || isLoading;

  const handleSend = async () => {
    if (!isDisabled) {
      const userMessage = { id: Date.now(), text: goal, isUser: true };
      setMessages([...messages, userMessage]);
      
      const currentGoal = goal;
      setGoal("");
      setIsLoading(true);

      try {
        const result = await sendGoal(currentGoal);
        
        if (result.success) {
          console.log('Goal sent successfully:', result.data);
          setMessages(prev => [
            ...prev,
            { 
              id: Date.now(), 
              text: result.data?.steps, 
              isUser: false 
            }
          ]);
        } else {
          console.error('Failed to send goal:', result.message);
          setMessages(prev => [
            ...prev,
            { 
              id: Date.now(), 
              text: "Sorry, there was an error saving your goal. Please try again.", 
              isUser: false 
            }
          ]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [
          ...prev,
          { 
            id: Date.now(), 
            text: "Something went wrong. Please try again.", 
            isUser: false 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1"> 
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Messages */}
        <ScrollView
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={{ marginBottom: 8, alignItems: message.isUser ? 'flex-end' : 'flex-start' }}
            >
              <View
                style={{
                  maxWidth: '70%',
                  borderRadius: 18,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  backgroundColor: message.isUser ? '#007AFF' : '#E5E5EA'
                }}
              >
                <Text style={{ fontSize: 17, color: message.isUser ? 'white' : 'black' }}>
                  {message.text}
                </Text>
              </View>
            </View>
          ))}

          {isLoading && (
            <View style={{ marginBottom: 8, alignItems: 'flex-start' }}>
              <View
                style={{
                  borderRadius: 18,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  backgroundColor: '#E5E5EA'
                }}
              >
                <ActivityIndicator size="small" color="#007AFF" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input bar */}
        <View style={{ padding: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
            <View style={{
              flex: 1,
              minHeight: 36,
              borderRadius: 18,
              borderWidth: 0.5,
              borderColor: '#D1D1D6',
              paddingHorizontal: 12,
              paddingVertical: 8
            }}>
              <TextInput
                value={goal}
                onChangeText={setGoal}
                placeholder="Create your goal..."
                placeholderTextColor="#999999"
                multiline
                editable={!isLoading}
                style={{ maxHeight: 100, fontSize: 17, padding: 0, color: 'white' }}
              />
            </View>

            <Pressable
              disabled={isDisabled}
              onPress={handleSend}
              style={{
                height: 36,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                backgroundColor: isDisabled ? '' : '#007AFF'
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M10 3L10 17M10 3L4 9M10 3L16 9"
                    stroke="white"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isDisabled ? 0.6 : 1}
                  />
                </Svg>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}