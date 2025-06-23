import express from 'express';
import fetch from 'node-fetch';
import { Midjourney } from 'midjourney';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Midjourney with your Discord IDs:
const mj = new Midjourney({
  ServerId:   "1386389683340050564",   // Your Discord server ID
  ChannelId:  "1386389683340050567",   // The channel you use for avatar generation
  SalaiToken: process.env.SALAI_TOKEN,  // To be set in your hosting environment
  Debug:      false,
  Ws:         false,
  fetch
});

app.get('/imagine', async (req, res) => {
  try {
    await mj.init();
    // You can override the prompt via ?prompt=your+prompt
    const prompt = req.query.prompt
      || "funky candy baby girl soldier character model";
    const grid   = await mj.Imagine(prompt);
    res.json({ images: grid.image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Bridge listening on http://localhost:${PORT}`);
});
