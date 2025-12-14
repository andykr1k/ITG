import json

from app.utils import load_prompt, parse_prompt


class ITGAssistant:
    """
    AI Assistant that helps users achieve their goals through planning,
    motivation, and progress tracking.
    
    Each instance maintains context (e.g., user background, conversation history). 
    
    Each function of VLM model inference will define what context is used and how it is used in the prompt.
    """
    
    # Default prompt files for each function
    DEFAULT_PROMPTS = {
        "generate_steps": {
            "system": "generate_steps_system.txt",
            "user": "generate_steps_user.txt"
        },
        # Future capabilities:
        # "motivate": {
        #     "system": "motivate_system.txt",
        #     "user": "motivate_user.txt"
        # },
        # "track_progress": {
        #     "system": "track_progress_system.txt",
        #     "user": "track_progress_user.txt"
        # },
    }
    
    def __init__(self, model, user_background: str = "", prompts: dict = None):
        """
        Initialize the AI Assistant.
        
        Args:
            model: The model client instance (e.g., OpenAI client)
            user_background: Information about the user for personalized responses
            prompts: Optional dict to override default prompt files per function
        """
        self.model = model
        self.user_background = user_background
        self.chat_history = []
        
        # Merge custom prompts with defaults
        self.prompts = {**self.DEFAULT_PROMPTS}
        if prompts:
            for func_name, prompt_files in prompts.items():
                if func_name in self.prompts:
                    self.prompts[func_name].update(prompt_files)
                else:
                    self.prompts[func_name] = prompt_files
    
    def set_user_background(self, background: str):
        """Update the user's background information."""
        self.user_background = background
    
    def clear_history(self):
        """Clear the conversation history."""
        self.chat_history = []
    
    def _build_system_context(self, base_system_prompt: str) -> str:
        """Build system prompt with user background context."""
        if self.user_background:
            return f"{base_system_prompt}\n\nUser Background:\n{self.user_background}"
        return base_system_prompt
    
    def generate_steps(self, goal: str) -> list[dict]:
        """
        Break down a goal into manageable steps.
        
        Args:
            goal: The user's goal description
            
        Returns:
            A list of steps, each containing 'step_number', 'title', and 'description'
        """
        prompt_files = self.prompts["generate_steps"]
        system_template = load_prompt(prompt_files["system"])
        user_template = load_prompt(prompt_files["user"])
        
        system_prompt = self._build_system_context(parse_prompt(system_template))
        user_prompt = parse_prompt(user_template, goal=goal)
        
        # Build messages with history context
        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(self.chat_history)
        messages.append({"role": "user", "content": user_prompt})
        
        # Example messages structure:
        # [
        #     {"role": "system", "content": "<system_prompt>\n\nUser Background:\n<user_background>"},
        #     {"role": "user", "content": "<previous_user_message>"},        # from chat_history
        #     {"role": "assistant", "content": "<previous_assistant_response>"},  # from chat_history
        #     ...  # more history pairs
        #     {"role": "user", "content": "<current_user_prompt>"}
        # ]
        
        response = self.model.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        
        # Update chat history
        self.chat_history.append({"role": "user", "content": user_prompt})
        self.chat_history.append({"role": "assistant", "content": content})
        
        result = json.loads(content)
        
        # Handle both direct array and wrapped object responses
        if isinstance(result, list):
            return result
        elif isinstance(result, dict) and "steps" in result:
            return result["steps"]
        else:
            # Try to find any list in the response
            for value in result.values():
                if isinstance(value, list):
                    return value
            return []
