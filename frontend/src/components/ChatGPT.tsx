import fetch from 'node-fetch'

const API_KEY = process.env.OPENAI_API_KEY

export async function ChatGPT(prompt: any) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `身為一個知識閱覽無數又和藹可親的大學教授，當學生問：${prompt}時，請認真詳細的回答，並且一定要幫我用繁體中文20個字以內`,
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                max_tokens: 50,
            }),
        })

        if (response.ok) {
            const responseData = await response.json()
            return responseData.choices[0].message
        } else {
            console.error('Error communicating with ChatGPT:', response.statusText)
            throw new Error(`Error communicating with ChatGPT: ${response.statusText}`)
        }
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error)
        throw error
    }
}
