function onFormSubmit(e) {
  var form = FormApp.openById('YOUR_FORM_ID');
  var response = e.response; // Get the form submission response
  
  // Define an array of question IDs to process
  var questionIds = ['QUESTION_1_ID', 'QUESTION_2_ID', 'QUESTION_3_ID', 'QUESTION_4_ID'];
  
  // Loop through each QUESTION ID
  for (var i = 0; i < questionIds.length; i++) {
    var question = form.getItemById(questionIds[i]).asMultipleChoiceItem();
    
    // Get the selected option from the form submission
    var responses = response.getItemResponses();
    var questionResponse = null;
    for (var j = 0; j < responses.length; j++) {
      if (responses[j].getItem().getId() == question.getId()) {
        questionResponse = responses[j].getResponse();
        break;
      }
    }
    
    // If the response is not found, log an error and continue to the next question
    if (!questionResponse) {
      Logger.log("Response for question with ID " + questionIds[i] + " not found.");
      continue;
    }
    
    // Get the choices of the question
    var choices = question.getChoices();
    
    // Remove the selected option from the choices
    for (var k = 0; k < choices.length; k++) {
      if (choices[k].getValue() === questionResponse) {
        choices.splice(k, 1); // Remove the selected choice
        break;
      }
    }
    
    // Update the choices of the question
    question.setChoiceValues(choices.map(function(choice) { return choice.getValue(); }));
  }
}
