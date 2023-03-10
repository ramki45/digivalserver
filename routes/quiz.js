
const router = require("express").Router();
const {Data} = require("../models/question");




router.get('/', async (req, res) => {
  try {
    const datas = await Data.find({})
    res.json(datas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const datas = await Data.findById(req.params.id)
    res.json(datas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.post("/",async (req, res) => {
   
    const { quizname, question, choice } = req.body;


    try {
      const newData = new Data({
        quizname, question, choice
      });

      const data = await newData.save();

      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  router.put('/:id', async (req, res) => {

    const { quizname, question, choice } = req.body;
    const quizFields = {};
    if (quizname) quizFields.quizname = quizname;
    if (question) quizFields.question = question;
    if (choice) quizFields.choice = choice;
   
  
    try {
      let data = await Data.findById(req.params.id);
      if (!data) return res.status(404).json({ msg: 'Data not found' });
  
      data = await Data.findByIdAndUpdate(
        req.params.id,
        { $set: quizFields },
        { new: true }
      );
  
      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const deldata = await Data.findById(req.params.id);
  
      if (!deldata) return res.status(404).json({ msg: 'data not found' });   
  
      await Data.findByIdAndRemove(req.params.id);
  
      res.json({ msg: 'Data removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  





module.exports = router;