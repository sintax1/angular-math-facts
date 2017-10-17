/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.quiz = function(req, res) {

  var problems = [];
  
  var factors1 = [];
  var factors2 = [];

  for (var i = req.body.factor1low; i <= req.body.factor1high; i++) {
    factors1.push(i);
  }

  for (var i = req.body.factor2low; i <= req.body.factor2high; i++) {
    factors2.push(i);
  }

  for (var i=1; i <= req.body.problemcount; i++) {

    var factor1 = factors1[Math.floor(Math.random()*factors1.length)];
    var factor2 = factors2[Math.floor(Math.random()*factors2.length)];

    problems.push(
      {
        factor1 : factor1,
        factor2 : factor2,
        answer : factor1 * factor2,
        useranswer : null,
        class : ''
      }
    );  
  }
 
  res.json(problems);
};
