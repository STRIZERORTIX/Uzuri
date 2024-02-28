"use server"
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utilis";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  //validate product url
  if(!productUrl){

  }
  //scrape product details
  try{
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if(!scrapedProduct)return;
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({url: scrapedProduct.url});
    if(existingProduct){
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        {price: scrapedProduct.currentPrice}
      ]
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        highestPrice: getHighestPrice(updatedPriceHistory),
        lowestPrice: getLowestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),

      }
    }
    const newProduct = await Product.findOneAndUpdate({
      url: scrapedProduct.url},
      product,
      {upsert: true, new: true},
    );
    revalidatePath(`/products/${newProduct._id}`);

  }catch(error:any){
    throw new Error(`Failed to scrape product details: ${error}`)
  }
}

export async function getProductById(productId: string) {
  try{
    connectToDB();
    const product = await Product.findOne({_id: productId});
    if(!product){
      throw new Error('Product not found');
    }
    return product;
  }catch(error:any){
    throw new Error(`Failed to get product details: ${error}`)
  }
}

export async function getAllProducts() {
  try{
    connectToDB();
    const products = await Product.find({});
    return products;
  }catch(error:any){
    throw new Error(`Failed to get product details: ${error}`)
  }
}

export async function getSimilarProducts(productId: string) {
  try{
    connectToDB();
    const currentProduct = await Product.findById(productId);
    if(!currentProduct) return null;
    const similarProducts = await Product.find({
      _id: {$ne: productId},
    }).limit(4);
    return similarProducts;
  }catch(error:any){
    throw new Error(`Failed to get product details: ${error}`)
  }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
  try{
    const product = await Product.findById(productId);

    if(!product) return;

    const userExists = product.users.some((user: User) => user.email === userEmail);

    if(!userExists) {
      product.users.push({ email: userEmail });
      await product.save();
      const emailContent = await generateEmailBody(product, "WELCOME");
      await sendEmail(emailContent, [userEmail]);
    }
  }catch(error:any){
    throw new Error(`Failed to add user email to product: ${error}`)
  }
}