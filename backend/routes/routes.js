const express = require('express');

const rpcClient = require('../rpcClient');


const config = require('../config'); // Vaš konfiguracijski fajl

const appRouter = express.Router();




appRouter.get('/api/:applicationId/choices', async (req, res) => {
    try {
      const { applicationId } = req.params;
  
      // Fetch choices and populate the branch name
      const choices = await ApplicantChoices.find({ application: applicationId })
        .populate('branch', 'name');  
  
      res.status(200).json(choices);
    } catch (error) {
      console.error('Error fetching choices:', error);
      res.status(500).json({ error: 'Failed to fetch choices' });
    }
  });
  
// Example route
appRouter.get('/', (req, res) => {
    res.send('Server is running on port 5000');
  });

  appRouter.get('/hello', (req, res) => {
    res.send('hello');
  });
  
appRouter.get('/api/last-blocks', async (req, res) => {
try {
    console.log("abc: ")
    const latestBlockHash = await rpcClient('getbestblockhash');
    let currentHash = latestBlockHash;
    console.log("HASH:  ",currentHash)
    const blocks = [];

    for (let i = 0; i < 10; i++) {
    const block = await rpcClient('getblock', [currentHash]);
    blocks.push({
        height: block.height,
        hash: block.hash,
        transactions: block.tx.length,
        size: block.size,
    });
    currentHash = block.previousblockhash;
    }

    res.json(blocks);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

appRouter.get('/api/transaction/:txid', async (req, res) => {
const { txid } = req.params;

console.log(txid)

try {
    const transaction = await rpcClient('getrawtransaction', [txid, true]);
    res.json(transaction);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

appRouter.post('/api/search', async (req, res) => {
    const { input } = req.body;

    if (!input) {
    return res.status(400).json({ error: "Input is required." });
    }

    console.log("input ",input)

    try {
    if (input.length === 64) {
        try {
        const transaction = await rpcClient('getrawtransaction', [input, true]);
        return res.json({ type: "transaction", data: transaction });
        } catch (err) {
        try {
            const block = await rpcClient('getblock', [input]);
            return res.json({ type: "block", data: block });
        } catch (blockErr) {
            console.error("Not a transaction or block:", blockErr.message);
        }
        }
    }

    if (!isNaN(input)) {
        const blockHeight = parseInt(input);
        const blockHash = await rpcClient('getblockhash', [blockHeight]);
        const block = await rpcClient('getblock', [blockHash]);
        return res.json({ type: "block", data: block });
    }

    try {
        const addressInfo = await rpcClient('getaddressinfo', [input]);
        if (addressInfo) {
        return res.json({ type: "address", data: addressInfo });
        } else {
        return res.status(404).json({ error: "Invalid Bitcoin address" });
        }
    } catch (addressErr) {
        console.error("Address error:", addressErr.message);
        return res.status(500).json({ error: "Address lookup failed." });
    }
    } catch (err) {
    console.error("General search error:", err.message);
    return res.status(500).json({ error: "Search failed." });
    }
});
    


module.exports = appRouter;