import fetch from 'node-fetch'

const API_KEY = process.env.OPENAI_API_KEY

export async function ChatGPT(prompt: any) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer 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`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a chatbot.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }),
        })

        if (response.ok) {
            const responseData = await response.json()
            return responseData.choices[0].message.content
        } else {
            console.error('Error communicating with ChatGPT:', response.statusText)
            throw new Error(`Error communicating with ChatGPT: ${response.statusText}`)
        }
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error)
        throw error
    }
}
