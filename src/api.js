import config from './config.json';

export async function solveSSP(requestData) {
    try {
        console.log(JSON.stringify(requestData))
        const response = await fetch(`http://${config.apiBaseURL}/cops/ssp/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        
        const data = await response.json()
        return data.result // 假設 API 返回的結果字段為 result
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
        throw error
    }
}
