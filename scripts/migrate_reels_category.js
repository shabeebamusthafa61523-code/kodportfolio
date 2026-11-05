const mongoose = require('../server/node_modules/mongoose');
require('../server/node_modules/dotenv').config({ path: 'server/.env' });
const Reel = require('../server/models/Reel');
const ReelCategory = require('../server/models/ReelCategory');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'kodbrand' });
  console.log('Connected to MongoDB');

  // Ensure "Reels" category exists
  let reelsCat = await ReelCategory.findOne({ name: { $regex: /^reels$/i } });
  if (!reelsCat) {
    reelsCat = await ReelCategory.create({ name: 'Reels', slug: 'reels', order: 1 });
  }

  // Update any reels with 'Short-Form Reels' or empty category to 'Reels'
  const updateRes = await Reel.updateMany(
    { $or: [{ category: 'Short-Form Reels' }, { category: null }, { category: '' }] },
    { $set: { category: 'Reels' } }
  );
  console.log(`Migrated ${updateRes.modifiedCount} reels to "Reels"`);

  // Remove stale 'Short-Form Reels' category if it exists
  await ReelCategory.deleteMany({ name: 'Short-Form Reels' });

  const allReels = await Reel.find();
  console.log('--- Current Reels in DB ---');
  allReels.forEach((r) => console.log(`• "${r.title}" => category: [${r.category}]`));

  const allCats = await ReelCategory.find();
  console.log('--- Current Categories in DB ---');
  allCats.forEach((c) => console.log(`• Category: [${c.name}]`));

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
