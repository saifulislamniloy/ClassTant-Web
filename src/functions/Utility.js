function removeUrlError(url){
  let valid = false;
  if(url.includes('http://'))
    valid = true;
  if(url.includes('https://'))
    valid = true;
  if(valid)
    return url;
  else return "https://"+url;
    
 }


export { removeUrlError };
