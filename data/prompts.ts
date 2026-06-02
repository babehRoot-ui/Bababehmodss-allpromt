export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  platform: string;
  author: string;
  likes: number;
  createdAt: string;
}

export const prompts: Prompt[] = [];
