//Listen for submit
document.getElementById('Loan-form').addEventListener('submit',function(e){
    //Hide results
    document.getElementById('Results').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    //Calculate results
    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

//calculate result
function calculateResults(){
    console.log('calculating..');
    //UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('Years');
    const monthlyPayment = document.getElementById('Monthly-payment');
    const totalPayment = document.getElementById('Total-payment');
    const totalInterest = document.getElementById('Total-interest');

    //Calculations
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    //compute Monthly payments
    const x = Math.pow(1 + calculatedInterest,calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);//Sets the no of decimal numbers 
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        //Show results
        document.getElementById('Results').style.display = 'block';
        //Hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError("Please check your numbers");
       
    }

   
}

//ShowError function
function showError(error){
     //Hide results
     document.getElementById('Results').style.display = 'none';

     //Hide loader
     document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');

    //set elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //in bootstrap when u want to show an alert you should give it a class of error as well as alert-danger(makes it red color)
    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above card
    card.insertBefore(errorDiv,heading);
    
    //Clear erroe after 3 seconds
    setTimeout(clearError, 3000);
}

//clear error function
function clearError(){
    document.querySelector('.alert').remove();
}
