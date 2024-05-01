import { validationResult } from 'express-validator'

const validateResult = (req, res, next) => {
  try{
    validationResult(req).throw()
    return next()
  } catch (err) {
    res.status(400).send({ errors: err.array(), validation: 'Negative' })
  }
}




// const validateResult = (req, res, next) => {
//   const posts = [...req.body, ...req.params, ...req.query]
//   try{
//     for (let i = 0; i < posts.length; i++) {
//       if (posts[i].includes("'")) posts[i].replace("'", "´")
//       for (let j = 0; j < badChars.length; j++) {
//         if (posts[i].match(badChars[j])) res.status(400).send({ errors: err.array(), validation: 'Negative' })
//       }
//     }

//     validationResult(req).throw()
//     return next()
//   } catch (err) {
//     res.status(400).send({ errors: err.array(), validation: 'Negative' })
//   }
// }


const badChars = [
  /select.*from|with/i,
  /insert.*into|values/i,
  /update.*set/i,
  /delete.*from|with/i,
  /drop.*from|aggre|role|assem|key|cert|cont|credential|data|endpoint|event|fulltext|function|index|login|type|schema|procedure|que|remote|role|route|sign|stat|syno|table|trigger|user|view|xml/i,
  /alter.*application|assem|key|author|cert|credential|data|endpoint|fulltext|function|index|login|type|schema|procedure|que|remote|role|route|serv|table|user|view|xml/i,
  /xp_/i,
  /sp_/i,
  /restore\s/i,
  /grant\s/i,
  /revoke\s/i,
  /dump/i,
  /use\s/i,
  /set\s/i,
  /truncate\s/i,
  /backup\s/i,
  /load\s/i,
  /save\s/i,
  /shutdown/i,
  /cast.*\(/i,
  /convert.*\(/i,
  /execute\s/i,
  /updatetext/i,
  /writetext/i,
  /reconfigure/i,
  /\/\*/,
  /\*\//,
  /;/,
  /--/,
  /\[/,
  /\]/,
  /char.*\(/i,
  /nchar.*\(/i,
  /%/,
];

// let newChars = strWords.replace(/%27/g, "");


module.exports = { validateResult }