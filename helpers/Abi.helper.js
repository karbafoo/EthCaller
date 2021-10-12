const axios = require('axios');
const ethers = require('ethers');

const getABI = (apiKey, {addr} = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'https://api.etherscan.io/api',
            params: {
                address: addr,
                module: 'contract',
                action: 'getabi',
                apiKey: apiKey,
                // apiKey: 'NG9G8RJUIARB54G2X64ME7FE3WU1QZ8XCT',
            },
        })
            .then((res) => {
                if (res.data.status === '1') {
                    resolve(res.data.result);
                } else {
                    reject(new Error('Contract not found'));
                }
            })
            .catch(() => reject(new Error('Contract not found')));
    });
};

const callFunc = (apiKey, {addr, fn, params} = {}) => {
    return new Promise(async (resolve, reject) => {
        const abi = await getABI(apiKey, {addr});
        let provider = ethers.getDefaultProvider('mainnet');
        let contract = new ethers.Contract(addr, abi, provider);
        if (typeof contract[fn] === 'function') {
            resolve(
                (await params)
                    ? contract[fn](...params.split(','))
                    : contract[fn]()
            );
        } else {
            reject(new Error('Function not found'));
        }
    });
};
module.exports = {
    callFunc,
};
