const moongose = require("mongoose");
const Photo = moongose.model("Photo",{
    title: {type: String, require:true},
    category: {type: String, require:true},
    url: {type: String, require:true},
    desc: {type:String, require:true},
    price: {type:Number, require:true},
    likes: {type:Number, require:true},
    comments:[
        {
            comment: {type:String, require:true},
            date:{type:Date, require:true}
        }
    ]
})


module.exports = Photo;