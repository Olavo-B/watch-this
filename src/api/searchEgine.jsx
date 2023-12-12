import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey:'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', dangerouslyAllowBrowser: true});

/**
 * Retrieves anime recommendations based on a given anime.
 * @param {string} anime - The name of the anime.
 * @returns {Promise<string>} - A promise that resolves to the recommended anime.
 */
export async function getAnimeRecommendation(anime) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Eu gosto do anime ${anime}. Quais outros animes você recomendaria?`
          }
        ],
      });

    return response.choices[0].text.trim();
};


