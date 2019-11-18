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
        id: 'prompts.id',
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
    .where({ id })

    return prompts
}

async function create(newPrompt) {
    const [id] = await db('prompts')
      .insert(newPrompt)
      .returning('id');
    if (id) {
      const prompt = await findById(id);
      return prompt;
    }
}

async function remove(id) {
    const prompt = await findById(id);
    if (prompt) {
      const deleted = await db('prompts')
        .where({ id })
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