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

export async function solveVCP(requestData) {
    const url = `http://${config.apiBaseURL}/cops/vcp`;
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

export async function solve01KP(requestData){
    const url = `http://${config.apiBaseURL}/cops/01kp`;
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

export async function solveGCP(requestData) {
    const url = `http://${config.apiBaseURL}/cops/gcp`;
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

export async function solveHCP(requestData){
    const url = `http://${config.apiBaseURL}/cops/hcp`;
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

export async function solveTSP(requestData){
    const url = `http://${config.apiBaseURL}/cops/tsp`;
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

export async function solveJSP(requestData){
    const url = `http://${config.apiBaseURL}/cops/jsp`;
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