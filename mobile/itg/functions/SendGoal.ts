import { SEND_GOAL_API_URL, UPLOAD_TOKEN } from '@env';

interface SendGoalResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function sendGoal(goal: string): Promise<SendGoalResponse> {
  try {
    const response = await fetch(SEND_GOAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': UPLOAD_TOKEN,
      },
      body: JSON.stringify({ goal }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error sending goal:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}