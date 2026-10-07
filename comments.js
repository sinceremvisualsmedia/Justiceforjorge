
(() => {
 const form=document.getElementById('comment-form');
 if(!form)return;
 const status=document.getElementById('comment-status');
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const data=new FormData(form);
  if(data.get('website'))return;
  const endpoint=window.JORGE_SITE_CONFIG?.commentsWebhookUrl;
  if(!endpoint){status.textContent='Comment submission is not connected yet. You can email your message to jmdepina3@gmail.com.';return;}
  const button=form.querySelector('button');button.disabled=true;status.textContent='Sending your comment…';
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({name:String(data.get('name')).trim(),message:String(data.get('message')).trim(),source:'Justice for Jorge website',submittedAt:new Date().toISOString()})});
   if(!response.ok)throw new Error('Submission failed');
   status.textContent='Thank you. Your comment has been sent to the project team for review.';form.reset();
  }catch{status.textContent='Your comment could not be confirmed as received. Please try again later or email jmdepina3@gmail.com.';}
  finally{clearTimeout(timeout);button.disabled=false;}
 });
})();
