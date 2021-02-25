import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware';
import { getAuctionById } from './getAuction';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function processAuctions(event, context) {
  console.log('Processing auctions');
}

export const handler = processAuctions;
