import Policy from './policy.model.js';

export async function getPolicy(){
  let doc = await Policy.findOne();
  if(!doc) doc = await Policy.create({});
  return doc;
}

export async function updatePolicy(payload){
  const doc = await getPolicy();
  Object.assign(doc, payload);
  await doc.save();
  return doc;
}