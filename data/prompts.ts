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

// Daftar platform AI (selalu tampil meski prompt kosong)
export const platforms: string[] = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "DeepSeek",
  "Grok",
  "Copilot",
  "Perplexity",
  "Qwen AI",
  "Llama",
  "Midjourney",
  "Stable Diffusion",
];

// Prompt list (kosong, akan diisi user via Submit)
export const prompts: Prompt[] = [];
