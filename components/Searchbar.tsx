"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValdAmazonProductUrl = (url: string) => {
  try{
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    //check if hostname is amazon.com or amazon.in
    if(hostname.includes('amazon.com')|| 
        hostname.includes('amazon.in') || 
        hostname.endsWith('amazon')){
      return true;
    }
  }catch(error){
    return false;
  }
}

const Searchbar = () => {

  const[searchPrompt, setSearchPrompt] = useState('');
  const[isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const isValidLink = isValdAmazonProductUrl(searchPrompt)
    if(!isValidLink){
      return alert('Please Provide a valid Amazon product link')
    }
    try{
      setIsLoading(true);
      //fetch product details
      const product = await scrapeAndStoreProduct(searchPrompt);

    }catch(error){
      console.log(error)
      return alert('An error occured while fetching the product details')
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-wrap gap-4 mt-12"
    onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Product Link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Loading...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar