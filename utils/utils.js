const HmacSHA256 = require('crypto-js/hmac-sha256');
const moment = require('moment');
const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss SSS";

function generatePayload(options){
	return {
		apiKey: options.apiKey,
        dateFrom: getDate(options.dateFrom),
        dateTo: getDate(options.dateTo),
        query: options.query,
        timestamp: options.timestamp,
        sign: generateSignature(options)
	};
}

function getDate(date = '0'){
	if(date === '-1'){
		return date;
	}else if(date === '0'){
		return new Date().getTime();
	}else{
		return parseDateToEpoch(date);
	}
}

function parseDateToEpoch(date){
	return moment(date, DATE_FORMAT).unix() * 1000;
}

function isValidDate(date){
	return moment(date, DATE_FORMAT).isValid();
}

function paramsAreOk(options){
	return !!options.apiKey
		&& !!options.apiSecret
		&& isCorrectDate(options.dateFrom) || options.dateFrom === '0' || typeof options.dateFrom === 'undefined'
		&& (isCorrectDate(options.dateTo) || options.dateTo === '-1' || options.dateTo === '0')
		&& !!options.query;
}

function isCorrectDate(date){
	return moment(date, DATE_FORMAT).isValid();
}

function generateSignature(options){
	const signMsg = options.apiKey
		+ getDate(options.dateFrom)
		+ getDate(options.dateTo)
		+ options.query
		+ options.timestamp;
    return HmacSHA256(signMsg, options.apiSecret).toString();
}

function getPayload4Body(options){
	const payload = generatePayload(options);
	return Object.keys(payload).reduce(reducePayloadToBody(payload), "");
}

function reducePayloadToBody(payload){
	return function(prev, key){
		return prev += key + "=" + payload[key] + "&";
  	}
}

function printLog(level){
	return function(data){
		console[level](JSON.stringify(data));
	}
}

module.exports = {
	DATE_FORMAT,
	getPayload4Body,
	isValidDate,
	paramsAreOk,
	printLog
}
