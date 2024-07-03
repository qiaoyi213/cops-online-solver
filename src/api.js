import config from './config.json';
import axios from 'axios';

export async function solveSSP(requestData) {
    const url = `http://${config.apiBaseURL}/cops/ssp`;
    const customConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    const response = await axios.post(url, JSON.stringify(requestData), customConfig);
    console.log(response.data);
    return response;   
}

export async function solveMCP(requestData) {
    const url = `http://${config.apiBaseURL}/cops/mcp`;
    const customConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    console.log(requestData);
    const response = await axios.post(url, JSON.stringify(requestData), customConfig);
    //console.log(response.data);
    return response;
}