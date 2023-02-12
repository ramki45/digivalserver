const mongoose = require("mongoose");
const Joi = require("joi");



const userDataSchema = new mongoose.Schema({
	
	quizname: { type: String, required: true },
	question: { type: Array, default:[],required: true },
	choice: { type: Array, default:[],required:true },
   
});




const Data = mongoose.model("userData", userDataSchema);


const validate = (data) => {
	const schema = Joi.object({
		
		quizname: Joi.string().required().label("Quizname"),
		question: Joi.string().required().label("Question"),
		choice: Joi.string().required().label("Choice"),
      
	});
	return schema.validate(data);
};

module.exports  = { Data, validate};