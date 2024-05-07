const express=require("express")
const {fetchDataMiddleware}  = require("./Middleware");
const router=express.Router()
const _ = require('lodash');

// ///////////////////////////////////Function For Caching Function(Fn)///////////////////////////////////////////////////
function customCache(fn,options) {
    return _.memoize(fn,  options);
  }

// /////////////////////////////////////////Funtion For Returing BlogData//////////////////////////////////////////////
 async function fetchBlogData(){
    try{
        const Result=await fetchDataMiddleware();
        if(Result.status===401){
            throw new Error(Result.Data);
        }
        const blogData = Result.Data;
        const uniqueTitlesSet = new Set();
    
        // Filter the blogData array to include only blogs with unique titles 
        const uniqueBlogs = blogData.filter(blog => {
          if (!uniqueTitlesSet.has(blog.title)) {
            uniqueTitlesSet.add(blog.title); 
            return true;
          }
          return false; 
        });
        const privacyBlogs = blogData.filter(blog =>
          blog.title.toLowerCase().includes('privacy')
        );
        const privacyBlogCount = privacyBlogs.length;
      
        // Prepare the result JSON
        const result = {
          blogCount: blogData.length,
          uniqueBlogCount: uniqueBlogs.length,
          uniqueBlogs,
          largestTitleBlog: blogData.reduce((prev, current) =>
            prev.title.length > current.title.length ? prev : current
          ),
          privacyBlogCount,
        };
      
        return {status:200,Data:result};

    }
    catch(error){
        return {status:401,Data:error}
    }
  }
  
// /////////////////////////////////////Function for Query Search////////////////////////////////////////////////
async function Query_Search(query){
  try{
    const Result=await fetchDataMiddleware();
    if(Result.status===401){
      throw new Error(Result.Data);
    }
    const blogData = Result.Data;
    // Filter the blogData based on query parameters
    let filteredBlogs = []; 

    if (query) {
    blogData.map((blog) =>{
        if(blog.title.toLowerCase().includes(query.toLowerCase())){
            filteredBlogs.push(blog)
        }
        });
    }
    const result = {
    filteredBlogCount: filteredBlogs.length,
    filteredBlogs,
    };

    return {status:200,Data:result};
}
catch(error){
  return {status:401,Data:error};
    
}
}
// ///////////////////////////Memorizing Original Functions /////////////////////////////////////////////////////////////////
const Memorized_Query_Search=customCache(Query_Search)
const memoizedFetchBlogData = customCache(fetchBlogData);

// //////////////////////////////////Api EndPoints///////////////////////////////////////////////////////////////
router.get('/blog-status',  async (req, res) => {
    try{
    const Response = await memoizedFetchBlogData();
    if(Response.status===401){
        throw new Error(Response.Data);
    }

        res.json(Response);
    }
    catch(error){
        res.send({status:401,Data:error.message})
    }
  });


  router.get('/blog-search', async (req, res) => {
    try{
      const query=req.query.query;
      const Response = await Memorized_Query_Search(query);
      if(Response.status===401){
          throw new Error(Response.Data);
      }
          res.json(Response);
      }
      catch(error){
        res.send({status:401,Data:error.message})
      }    
  });
  

module.exports=router
