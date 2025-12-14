from pathlib import Path

# Base directory for prompt files
PROMPTS_DIR = Path(__file__).parent.parent / "ai" / "prompts"


def load_prompt(filename: str) -> str:
    """
    Load a prompt template from a file.
    
    Args:
        filename: Name of the prompt file (e.g., 'generate_steps_system.txt')
        
    Returns:
        The prompt template string
    """
    prompt_path = PROMPTS_DIR / filename
    return prompt_path.read_text().strip()


def parse_prompt(template: str, **kwargs) -> str:
    """
    Parse a prompt template by substituting placeholders with provided values.
    
    Args:
        template: The prompt template string with {placeholder} syntax
        **kwargs: Key-value pairs to substitute into the template
        
    Returns:
        The formatted prompt string
        
    Example:
        >>> template = "Break down this goal: {goal}"
        >>> parse_prompt(template, goal="Learn Python")
        "Break down this goal: Learn Python"
    """
    return template.format(**kwargs)
