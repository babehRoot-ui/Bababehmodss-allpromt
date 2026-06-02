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

export const prompts: Prompt[] = [
  {
    id: "1",
    title: "Menulis Artikel SEO Berkualitas Tinggi",
    description:
      "Prompt untuk menghasilkan artikel SEO yang teroptimasi dengan struktur yang jelas dan keyword natural.",
    content: `Kamu adalah seorang penulis konten SEO profesional dengan pengalaman 10 tahun. Buatkan artikel tentang [TOPIC] dengan ketentuan berikut:

1. Judul yang menarik dan mengandung keyword utama
2. Meta description (max 155 karakter)
3. Introduction yang engaging dengan hook di paragraf pertama
4. Minimum 1500 kata dengan struktur H2 dan H3 yang terorganisir
5. Gunakan keyword utama secara natural, density 1-2%
6. Sertakan LSI keywords yang relevan
7. Bullet points untuk informasi yang mudah dipindai
8. Conclusion dengan CTA yang kuat
9. Tone: profesional tapi friendly
10. Bahasa: Indonesia yang natural dan mengalir`,
    platform: "ChatGPT",
    author: "Babehmodss",
    likes: 142,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Analisis Data Mendalam dengan Claude",
    description:
      "Menggunakan Claude untuk menganalisis dataset kompleks dan menghasilkan insight yang actionable.",
    content: `Saya akan memberikan sebuah dataset. Kamu adalah data analyst senior yang ahli dalam menemukan pola tersembunyi dan insight bisnis.

Lakukan analisis berikut:
1. Identifikasi tren utama dan pola yang signifikan
2. Hitung statistik deskriptif yang relevan
3. Temukan anomali atau outlier yang menarik
4. Berikan rekomendasi bisnis berdasarkan temuan
5. Visualisasikan data dalam bentuk tabel yang mudah dipahami
6. Berikan confidence level untuk setiap insight
7. Saran langkah selanjutnya untuk deep-dive

Format output: Executive Summary → Detailed Analysis → Key Insights → Recommendations → Next Steps`,
    platform: "Claude",
    author: "Babehmodss",
    likes: 98,
    createdAt: "2025-01-14T08:30:00Z",
  },
  {
    id: "3",
    title: "Generate Image Prompt untuk Midjourney",
    description:
      "Template prompt Midjourney yang menghasilkan gambar berkualitas tinggi dengan gaya tertentu.",
    content: `[SUBJECT DESCRIPTION], [STYLE REFERENCE], [LIGHTING], [COLOR PALETTE], [COMPOSITION], [CAMERA ANGLE], [MOOD/ATMOSPHERE], --ar [ASPECT RATIO] --v 6.1 --s [STYLIZE VALUE] --q 2

Contoh penggunaan:
A serene Japanese garden with cherry blossoms falling gently, Studio Ghibli animation style, soft golden hour lighting, pastel pink and green color palette, wide angle composition, low angle shot looking up at the trees, peaceful and dreamy atmosphere, --ar 16:9 --v 6.1 --s 750 --q 2

Variasi style yang bisa digunakan: photorealistic, anime, oil painting, watercolor, 3D render, cinematic, etc.`,
    platform: "Midjourney",
    author: "Babehmodss",
    likes: 234,
    createdAt: "2025-01-13T14:00:00Z",
  },
  {
    id: "4",
    title: "Coding Assistant - Debug & Refactor",
    description:
      "Prompt untuk membantu debug dan refactor kode dengan penjelasan detail setiap perubahan.",
    content: `Kamu adalah senior software engineer dengan spesialisasi di [LANGUAGE/FRAMEWORK]. Saya akan memberikan kode yang perlu di-debug dan di-refactor.

Lakukan hal berikut:
1. Identifikasi semua bug dan potential issues
2. Jelaskan root cause dari setiap bug
3. Berikan solusi fix dengan kode yang sudah diperbaiki
4. Refactor kode mengikuti best practices dan design patterns
5. Tambahkan error handling yang proper
6. Optimasi performa jika ada
7. Tambahkan komentar di bagian yang penting
8. Berikan rating code quality sebelum dan sesudah (1-10)
9. Jelaskan setiap perubahan yang kamu lakukan dan alasannya

Kode saya:
[PASTE CODE HERE]`,
    platform: "DeepSeek",
    author: "Babehmodss",
    likes: 187,
    createdAt: "2025-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Content Strategist - Social Media Plan",
    description:
      "Membuat rencana konten social media 30 hari yang lengkap dengan caption dan hashtag.",
    content: `Kamu adalah social media strategist yang sudah menangani brand-brand besar. Buatkan content plan 30 hari untuk [BRAND/NAMA BISNIS] di platform [INSTAGRAM/TIKTOK/TWITTER].

Informasi brand:
- Niche: [NICHES]
- Target audience: [DEMOGRAFIS]
- Tone of voice: [FORMAL/KASUAL/HUMOR]
- Goal: [FOLLOWERS/ENGAGEMENT/SALES]

Output yang diharapkan:
1. Content pillar (3-5 tema utama)
2. Kalender 30 hari dalam format tabel: Hari | Tipe Konten | Topik | Caption | Hashtag (10-15) | Waktu Posting
3. Tipe konten bervariasi: educative, entertaining, promotional, behind-the-scenes, UGC-style
4. Hook yang kuat untuk setiap caption (3 opsi per post)
5. CTA yang sesuai dengan goal
6. Tips engagement untuk setiap minggu`,
    platform: "Gemini",
    author: "Babehmodss",
    likes: 156,
    createdAt: "2025-01-11T11:20:00Z",
  },
  {
    id: "6",
    title: "Grok - Research & Fact Checker",
    description:
      "Memanfaatkan Grok untuk riset mendalam dan fact-checking informasi dari berbagai sumber.",
    content: `Lakukan riset mendalam tentang [TOPIC] dengan metodologi berikut:

1. **Literature Review**: Ringkasan dari berbagai perspektif dan sumber terpercaya
2. **Fact Check**: Verifikasi klaim-klaim umum tentang topik ini (benar/parsial/salah)
3. **Historical Context**: Latar belakang historis yang relevan
4. **Current State**: Situasi terkini dan perkembangan terbaru
5. **Key Statistics**: Data dan angka penting beserta sumbernya
6. **Expert Opinions**: Pandangan dari para ahli di bidang ini
7. **Controversies**: Kontroversi atau perdebatan yang ada
8. **Future Outlook**: Prediksi dan tren ke depan
9. **Knowledge Gaps**: Area yang masih perlu diteliti lebih lanjut
10. **Sources**: Daftar referensi yang bisa diverifikasi

Level kedalaman: Akademis tapi mudah dipahami
Bahasa: Indonesia`,
    platform: "Grok",
    author: "Babehmodss",
    likes: 89,
    createdAt: "2025-01-10T09:15:00Z",
  },
  {
    id: "7",
    title: "Stable Diffusion - Character Design Sheet",
    description:
      "Prompt untuk membuat character design sheet lengkap dengan berbagai ekspresi dan angle.",
    content: `masterpiece, best quality, character design sheet, multiple views, front view, side view, back view, 3/4 view,

[CHARACTER DESCRIPTION: age, gender, body type, height],

[CLOTHING: detailed outfit description, accessories, shoes],

[HAIR: style, color, length],

[FACIAL FEATURES: eye color, face shape, distinguishing marks],

[EXPRESSIONS: neutral, happy, angry, sad, surprised],

[COLOR PALETTE: main colors with hex codes],

art style: [anime/realistic/semi-realistic],
clean white background, reference sheet, concept art,
highly detailed, consistent design across all views`,
    platform: "Stable Diffusion",
    author: "Babehmodss",
    likes: 201,
    createdAt: "2025-01-09T13:30:00Z",
  },
  {
    id: "8",
    title: "Copilot - Unit Test Generator",
    description:
      "Generate unit test yang komprehensif untuk fungsi JavaScript/TypeScript dengan coverage tinggi.",
    content: `Generate unit test yang komprehensif untuk fungsi berikut menggunakan [JEST/VITEST/MOCHA].

Requirements:
1. Test semua happy path scenarios
2. Test edge cases (empty input, null, undefined, extreme values)
3. Test error handling paths
4. Mock external dependencies properly
5. Use descriptive test names following: "should [expected behavior] when [condition]"
6. Arrange-Act-Assert pattern
7. Test both synchronous and asynchronous code
8. Include snapshot tests jika relevan
9. Target minimum 90% code coverage
10. Add comments for complex test cases

Fungsi yang akan di-test:
[PASTE FUNCTION HERE]

Tipe data input/output:
[DESCRIBE TYPES]`,
    platform: "Copilot",
    author: "Babehmodss",
    likes: 124,
    createdAt: "2025-01-08T15:00:00Z",
  },
  {
    id: "9",
    title: "Perplexity - Academic Paper Summarizer",
    description:
      "Meringkas paper akademis panjang menjadi ringkasan terstruktur yang mudah dipahami.",
    content: `Saya akan memberikan abstract atau full text dari sebuah paper akademis. Buatkan ringkasan terstruktur dengan format:

**Metadata**
- Judul:
- Penulis:
- Tahun:
- Journal:
- DOI:

**TL;DR** (max 2 kalimat)

**Research Question**
Apa pertanyaan penelitian utama?

**Methodology**
- Metode penelitian
- Sample size
- Tools/techniques used
- Duration

**Key Findings**
1. Finding 1
2. Finding 2
3. Finding 3
...

**Limitations**
Apa saja keterbatasan penelitian ini?

**Practical Implications**
Bagaimana hasil ini bisa diterapkan di dunia nyata?

**Future Research**
Apa yang perlu diteliti selanjutnya?

**Rating** (Novelty: /5 | Rigor: /5 | Clarity: /5 | Relevance: /5)

Paper: [PASTE TEXT HERE]`,
    platform: "Perplexity",
    author: "Babehmodss",
    likes: 76,
    createdAt: "2025-01-07T10:45:00Z",
  },
  {
    id: "10",
    title: "Qwen AI - Bilingual Translator Pro",
    description:
      "Terjemahan berkualitas tinggi yang mempertahankan nuansa, tone, dan konteks budaya.",
    content: `Kamu adalah penerjemah profesional bersertifikasi dengan keahlian di pasangan bahasa Indonesia-English. Terjemahkan teks berikut dengan standar tinggi:

Prinsip penerjemahan:
1. Makna dan pesan utama harus identik, bukan word-for-word
2. Pertahankan tone dan register (formal/casual/academic)
3. Adaptasi budaya jika diperlukan (bukan literal translation)
4. Gunakan idiom yang setara di bahasa target
5. Pertahankan formatting (bold, italic, lists)
6. Konsistensi terminologi sepanjang teks
7. Kalimat harus mengalir natural di bahasa target

Output format:
📄 **Terjemahan:**
[translated text]

📝 **Catatan Penerjemahan:**
- Jelaskan keputusan penerjemahan yang tidak literal
- Catatan cultural adaptation jika ada
- Alternatif penerjemahan untuk bagian yang tricky

Teks yang diterjemahkan:
[PASTE TEXT HERE]`,
    platform: "Qwen AI",
    author: "Babehmodss",
    likes: 67,
    createdAt: "2025-01-06T12:00:00Z",
  },
  {
    id: "11",
    title: "Llama - API Documentation Writer",
    description:
      "Generate dokumentasi API yang lengkap, jelas, dan developer-friendly.",
    content: `Kamu adalah technical writer senior yang ahli menulis dokumentasi API. Buatkan dokumentasi lengkap untuk API berikut:

Struktur dokumentasi yang diharapkan:

**Overview**
- Deskripsi singkat API
- Base URL
- Authentication method
- Rate limits

**Endpoints**

Untuk setiap endpoint:
- **Method & Path**: `GET /api/v1/resource`
- **Description**: Apa yang dilakukan endpoint ini
- **Authentication**: Required/Optional
- **Headers**: Tabel dengan name, type, required, description
- **Request Body**: JSON schema dengan tipe data, required, deskripsi, contoh
- **Query Parameters**: Tabel jika ada
- **Response**: 
  - Success (200): JSON example + field descriptions
  - Error responses: 400, 401, 403, 404, 500 dengan contoh
- **Code Examples**: cURL, JavaScript (fetch), Python (requests)
- **Notes**: Edge cases, limitations, tips

**Error Codes**
Tabel lengkap semua error codes

**SDKs & Libraries** (jika ada)

API spec:
[PASTE API SPEC/CODE HERE]`,
    platform: "Llama",
    author: "Babehmodss",
    likes: 93,
    createdAt: "2025-01-05T17:30:00Z",
  },
  {
    id: "12",
    title: "ChatGPT - Email Marketing Sequence",
    description:
      "Buat sequence email marketing 7 hari yang converting dengan storytelling dan psychology triggers.",
    content: `Kamu adalah email marketing copywriter yang sudah menghasilkan jutaan dollar revenue melalui email. Buatkan email sequence 7 hari untuk produk [PRODUCT/SERVICE].

Target audience: [DESCRIBE]
Price point: [PRICE]
Main pain point: [PAIN POINT]
Desired outcome: [DESIRED RESULT]

Untuk setiap email (Day 1-7), buatkan:

**Email #[N] - [THEME]**
- Subject Line: 3 opsi (A/B/C testing) dengan emotional hook
- Preview Text: Menggunakan curiosity gap
- Body: 
  - Hook opening (first 2 lines paling penting)
  - Story/relatable scenario
  - Transition ke solusi
  - Social proof / credibility
  - CTA yang clear dan single focus
  - P.S. line untuk urgency atau bonus info
- Send Time: Rekomendasi waktu kirim
- Goal email ini: [awareness/engagement/trust/close]

Psychology triggers to incorporate: reciprocity, social proof, scarcity, authority, liking, commitment, urgency`,
    platform: "ChatGPT",
    author: "Babehmodss",
    likes: 178,
    createdAt: "2025-01-04T08:00:00Z",
  },
];
