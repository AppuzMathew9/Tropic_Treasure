(()=>{function restore(){let draft;try{const raw=sessionStorage.getItem('tt-product-enquiry');if(!raw)return;draft=JSON.parse(raw);}catch{return;}
if(!draft||Date.now()-draft.savedAt>30*60*1000)return;
const product=new URLSearchParams(location.search).get('product');if(product!==draft.product)return;
const select=document.querySelector('select[name="product"]');if(!select)return;const form=select.form;
let option=[...select.options].find(x=>x.value===draft.product);if(!option){option=new Option(draft.product,draft.product);select.add(option);}select.value=draft.product;
for(const [source,target]of [['buyer','name'],['email','email'],['quantity','quantity'],['destination','destination'],['requirements','message']]){const input=form.elements.namedItem(target);if(input&&draft[source]){input.value=draft[source];input.dispatchEvent(new Event('input',{bubbles:true}));}}
try{sessionStorage.removeItem('tt-product-enquiry');}catch{}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restore);else restore();})();
