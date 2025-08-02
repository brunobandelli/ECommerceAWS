#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack'
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: "466735246414",
  region: "us-east-1",
}

const tags = {
  cost: "ECommerce",
  team: "BandelliCode"
}

const productsAppsStack = new ProductsAppStack(app, "ProductsApp", {
  tags: tags,
  env: env
})
 
const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppsStack.productsFetchHandler,
  tags: tags,
  env: env
})

eCommerceApiStack.addDependency(productsAppsStack)