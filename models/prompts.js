const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findById,
    create,
    remove,
    update
}

async function find(id){ //find all prompts for user with {id}
    const prompts = await db('prompts').select({
        id: 'id',
        prompt: 'prompts.prompt'
    })
    .orderBy('id', 'asc')
    .where({ user_id: id})
    return prompts
}


async function findById(id){
    const prompts = await db('prompts').select({
        id: 'prompts.id',
        prompt: 'prompts.prompt'
    })
    .where({ 'prompts.id': id })
    return prompts
}

async function create(newPromptArray) {
  newPromptArray.forEach(async (prompt) => {
    const [id] = await db('prompts').insert(prompt).returning('id');
    if (id) {
      const prompt = await findById(id);
      return prompt;
    }
  })
    // const [id] = await db('prompts')
    //   .insert(newPrompt)
    //   .returning('id');
    // if (id) {
    //   const prompt = await findById(id);
    //   return prompt;
    // }
}

async function remove(id) {
    const prompt = await findById(id);
    if (prompt) {
      const deleted = await db('prompts')
        .where({ 'prompts.id': id })
        .delete();
      if (deleted) {
        return prompt;
      }
    }
}

async function update(updates, id) {
    const editedPrompt = await db('prompts')
      .where({ id })
      .update(updates);
    if (editedPrompt) {
      const prompt = await findById(id);
      return prompt;
    }
  }